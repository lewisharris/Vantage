import { gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
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
        const newCompany = await prisma.company.create({ data: args.input });
        return newCompany;
      } catch (err) {
        return err;
      }
    },
    updateCompanyUsername: async (_, args) => {
      try {
        const updatedUsername = await prisma.company.update({
          where: { id: args.input.id },
          data: { username: args.input.newUsername },
        });
        return updatedUsername;
      } catch (err) {
        return err;
      }
    },
  },
};

export { typeDefs, resolvers };
