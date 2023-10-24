import { gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApolloError, UserInputError } from "apollo-server-express";
const prisma = new PrismaClient();

const typeDefs = gql`
  type Company {
    id: ID!
    name: String!
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
    token: String
    email: String!
    company: ID!
    location: String
    first_name: String!
    last_name: String!
    username: String
    admin: Boolean!
  }

  input CreateNewCompanyInput {
    name: String!
  }

  enum AccessType {
    USER
    ADMIN
    SUPER_ADMIN
  }

  input RegisterUserInput {
    email: String!
    companyId: String!
    first_name: String!
    last_name: String!
    username: String!
    password: String!
    access: AccessType!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Query {
    companies: [Company!]!
    company(email: String): Company!
  }

  type Mutation {
    createNewCompany(input: CreateNewCompanyInput!): Company!
    registerUser(input: RegisterUserInput!): User!
    loginUser(input: LoginUserInput!): Company!
  }
`;

const resolvers = {
  Query: {
    companies: async () => {
      try {
        const allCompanies = await prisma.Company.findMany();
        return allCompanies;
      } catch (err) {
        console.log(err);
      }
    },
    company: async (_, args) => {
      const email = args.email;
      try {
        const company = await prisma.Company.findFirst({
          where: { email: email },
          include: { teams: true },
        });
        return company;
      } catch (err) {
        throw new ApolloError("Failed to find user", "FAILED_TO_FIND_COMPANY");
      }
    },
  },
  Mutation: {
    createNewCompany: async (_, args) => {
      try {
        let { name } = args.input;
        // if missing credentials notify user
        // check for existing user
        const existingCompany = await prisma.company.findFirst({
          where: { name: name },
        });
        if (existingCompany) {
          throw new UserInputError("Company already exists");
        }
        //Password hashing
        // const salt = await bcrypt.genSalt(10);
        // password = await bcrypt.hash(password, salt);
        const newCompany = await prisma.company.create({
          data: { name },
        });
        // generate token
        // return user and token session
        return newCompany;
      } catch (err) {
        throw new UserInputError("Unable to create company.");
      }
    },
    registerUser: async (_, args) => {
      const { email, companyId, password, first_name, last_name, access } =
        args.input;

      try {
        const existingUser = await prisma.user.findFirst({
          where: { email: email },
        });
        if (existingUser) {
          throw new ApolloError("User already exists", "USER_ALREADY_EXISTS");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        let user = await prisma.user.create({
          data: {
            email: email.toLowerCase(),
            password: passwordHash,
            companyId,
            first_name,
            last_name,
            access,
          },
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        user = await prisma.user.update({
          where: { email: email.toLowerCase() },
          data: { token: token },
        });
        const { password: newPassword, ...rest } = user;
        return rest;
      } catch (err) {
        throw new ApolloError("Unable to create company.");
      }
    },
    loginUser: async (_, args) => {
      const { email, password } = args.input;
      try {
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new ApolloError("Invalid Password");
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        user = await prisma.user.update({
          where: { email: email.toLowerCase() },
          data: { token: token },
        });
        const { password: newPassword, ...rest } = user;
        return rest;
      } catch (err) {
        return err;
      }
    },
  },
};

export { typeDefs, resolvers };
