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

  type Query {
    companies: [Company!]!
    company(id: ID!): Company!
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
        return await prisma.Company.findUnique({ where: { id: id } });
      } catch (err) {
        return err;
      }
    },
  },
};

export { typeDefs, resolvers };
