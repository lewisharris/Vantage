import { gql, AuthenticationError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApolloError, UserInputError } from "apollo-server-express";

// Authenticate token - This needs moving to Auth file
const auth = () => {
  // context = {...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ..
    const token = authHeader.split("bearer")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};

const prisma = new PrismaClient();

const typeDefs = gql`
  type Company {
    id: ID!
    name: String!
    users: [User!]
    teams: [Team!]
  }

  type Team {
    id: ID!
    name: String!
    location: String!
    company: Company!
  }

  type User {
    id: ID!
    token: String!
    email: String!
    companyId: ID!
    location: String
    first_name: String!
    last_name: String!
    username: String
    access: Role!
    company: Company!
  }
  enum Role {
    USER
    ADMIN
    SUPER_ADMIN
  }

  input createCompanyInput {
    name: String!
  }

  input RegisterUserInput {
    email: String!
    companyId: String!
    first_name: String!
    last_name: String!
    username: String
    password: String!
    access: Role
  }

  input LoginAdminUserInput {
    email: String!
    password: String!
  }

  type Query {
    companies: [Company!]!
    company(email: String): Company!
    adminUser(id: String!): User!
    findMembers(companyId: String): Company!
    getUser(id: String!): User!
  }

  type Mutation {
    createCompany(input: createCompanyInput!): Company!
    registerUser(input: RegisterUserInput!): User!
    loginAdmin(input: LoginAdminUserInput!): User!
    registerMember(input: RegisterUserInput!): User!
  }
`;

const resolvers = {
  Query: {
    companies: async () => {
      try {
        const allCompanies = await prisma.company.findMany();
        return allCompanies;
      } catch (err) {
        console.log(err);
      }
    },
    company: async (_, args) => {
      const email = args.email;
      try {
        const company = await prisma.company.findFirst({
          where: { email: email },
          include: { teams: true }
        });
        return company;
      } catch (err) {
        throw new ApolloError("Failed to find user", "FAILED_TO_FIND_COMPANY");
      }
    },
    adminUser: async (_, args, context) => {
      const id = args.id;
      try {
        const user = await prisma.user.findFirst({
          where: { id: id },
          include: { company: true }
        });
        if (user.access === "USER" || null) {
          throw new ApolloError("Unauthorized", "UNAUTHORIZED_ADMIN");
        }
        return user;
      } catch (err) {
        throw new ApolloError(
          "Failed to fetch user data",
          "ADMIN_USER_FETCH_FAILED"
        );
      }
    },
    getUser: async (_, args) => {
      console.log("fired");
      const id = args.id;
      try {
        const user = await prisma.user.findFirst({
          where: { id: id },
          include: { company: true }
        });
        return user;
      } catch (err) {
        throw new ApolloError(
          "Failed to fetch user data",
          "ADMIN_USER_FETCH_FAILED"
        );
      }
    },
    findMembers: async (_, args) => {
      const companyId = args.companyId;
      try {
        const members = await prisma.company.findFirst({
          where: { id: companyId },
          include: { users: true }
        });
        if (!members) {
          throw new ApolloError("No Members");
        }
        console.log(members);
        return members;
      } catch (err) {
        throw new ApolloError(
          "Could not retrieve data, please try again",
          "FAILED__TO_FIND_MEMBERS"
        );
      }
    }
  },
  Mutation: {
    createCompany: async (_, args) => {
      console.log("here");
      try {
        let { name } = args.input;
        const existingCompany = await prisma.company.findFirst({
          where: { name: name }
        });
        if (existingCompany) {
          throw new UserInputError("Company already exists");
        }
        const newCompany = await prisma.company.create({
          data: { name }
        });
        return newCompany;
      } catch (err) {
        throw new UserInputError("Unable to create company.");
      }
    },
    registerUser: async (_, args) => {
      const {
        email,
        companyId,
        password,
        first_name,
        last_name,
        access
      } = args.input;
      try {
        const existingUser = await prisma.user.findFirst({
          where: { email: email }
        });
        if (existingUser) {
          throw new ApolloError("User already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);

        let user = await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            companyId,
            first_name,
            last_name,
            access
          }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        user = await prisma.user.update({
          where: { email: email },
          data: { token: token }
        });

        const { password: newPassword, ...rest } = user;
        return rest;
      } catch (err) {
        throw new ApolloError("Unable to register user.");
      }
    },
    loginAdmin: async (_, args) => {
      const { email, password } = args.input;
      if (!email && !password) {
        throw new ApolloError(
          "No email or password entered.",
          "LOGIN_CREDENTIALS_MISSING"
        );
      }
      if (!email) {
        throw new ApolloError(
          "Please enter a valid email",
          "LOGIN_EMAIL_MISSING"
        );
      }
      if (!password) {
        throw new ApolloError(
          "Please enter a valid password",
          "LOGIN_PASSWORD_MISSING"
        );
      }

      try {
        let user = await prisma.user.findFirst({
          where: { email: email }
        });
        if (!user) {
          throw new ApolloError(
            "No user with that email exists.",
            "INVALID_EMAIL_ADMIN"
          );
        }
        if (user.access !== "ADMIN" || null) {
          throw new ApolloError("Unauthorized", "UNAUTHORIZED_ADMIN");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new ApolloError("Invalid Password", "INVALID_PASSWORD");
        }
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        user = await prisma.user.update({
          where: { email: email.toLowerCase() },
          data: { token: token }
        });
        return user;
      } catch (err) {
        throw new ApolloError("Unable to log in", "LOGIN_FAILED");
      }
    },
    registerMember: async (_, args) => {
      const { email, companyId, password, first_name, last_name } = args.input;
      try {
        const existingUser = await prisma.user.findFirst({
          where: { email: email }
        });
        if (existingUser) {
          throw new ApolloError("User already exists", "USER_ALREADY_EXISTS");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        let user = await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            companyId,
            first_name,
            last_name,
            access: "USER"
          }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        user = await prisma.user.update({
          where: { email: email },
          data: { token: token }
        });

        const { password: newPassword, ...rest } = user;
        return rest;
      } catch (err) {
        throw new ApolloError(
          "Unable to register user.",
          "UNABLE_TO_REGISTER_MEMBER"
        );
      }
    }
  }
};

export { typeDefs, resolvers };
