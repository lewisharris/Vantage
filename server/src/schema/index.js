import { gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const typeDefs = gql`
  type Company {
    id: ID
    username: String!
    email: String!
    teams: [Team!]
  }

  type Team {
    name: String!
    companyId: String
    location: String
  }
  type Transaction {
    id: ID
  }

  input CreateCompanyInput {
    username: String!
    password: String!
    email: String!
  }

  input UpdateCompanyUsernameInput {
    id: ID
    newUsername: String
  }

  type Query {
    companies: [Company!]!
    company(id: ID!): Company!
  }
  type Mutation {
    createCompany(input: CreateCompanyInput!): Company
    updateCompanyUsername(input: UpdateCompanyUsernameInput!): Company!
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
      const id = args.id;
      try {
        const company = await prisma.Company.findFirst({
          where: { id: id },
          include: { teams: true },
        });
        return company;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createCompany: async (parent, args) => {
      try {
        let { username, email, password } = args;
        //Password hashing
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
        const newCompany = await prisma.company.create({
          data: { username, hashedPassword, email },
        });
        return newCompany;
      } catch (err) {
        console.log(err);
      }
    },

    // if missing credentials notify user
    // check for existing user
    // generate token
    // return user and token session

    updateCompanyUsername: async (_, args) => {
      const { id, newUsername } = args.input;
      try {
        const updatedUsername = await prisma.company.update({
          where: { id: id },
          data: { username: newUsername },
        });
        return updatedUsername;
      } catch (err) {
        return err;
      }
    },
  },
};

export { typeDefs, resolvers };
