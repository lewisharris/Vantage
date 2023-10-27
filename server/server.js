import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { typeDefs, resolvers } from "./schema/index.js";

const prisma = new PrismaClient();
const port = 4000;

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors("*"));

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          return { user: null };
        }
        const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
        return { user: decoded };
      } catch (err) {
        return { user: null };
      }
    }
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`gql path is ${apolloServer.graphqlPath}`);
});
