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
    token: String!
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

  input CreateNewUserInput {
    email: String!
    first_name: String!
    company: String!
    last_name: String!
    username: String
    admin: Boolean!
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
    createNewUser(input: CreateNewUserInput!): User!
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
          include: { teams: true }
        });
        return company;
      } catch (err) {
        throw new ApolloError("Failed to find user", "FAILED_TO_FIND_COMPANY");
      }
    }
  },
  Mutation: {
    createNewCompany: async (_, args) => {
      try {
        let { name } = args.input;
        // if missing credentials notify user
        // check for existing user
        const existingCompany = await prisma.company.findFirst({
          where: { name: name }
        });
        if (existingCompany) {
          throw new UserInputError("Company already exists");
        }
        //Password hashing
        // const salt = await bcrypt.genSalt(10);
        // password = await bcrypt.hash(password, salt);
        const newCompany = await prisma.company.create({
          data: { name }
        });
        // generate token
        // return user and token session
        return newCompany;
      } catch (err) {
        throw new UserInputError("Unable to create company.");
      }
    },
    createNewUser: async (_, args) => {},
    loginUser: async (_, args) => {
      const { email, password } = args.input;
      try {
        const user = await prisma.company.findUnique({
          where: { email: email }
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid Password");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        return err;
      }
    }
  }
};

export { typeDefs, resolvers };
