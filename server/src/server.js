import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

import { typeDefs, resolvers } from "./schema/index.js";

const prisma = new PrismaClient();
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`gql path is ${apolloServer.graphqlPath}`);
});

app.get("/", async (req, res) => {
  try {
    const allUsers = await prisma.Company.findMany();
    res.json(allUsers);
  } catch (err) {
    return res.status(502).json("No companies found in database");
  }
});

app.post("/", async (req, res) => {
  const newUser = await prisma.Company.create({ data: req.body });
  res.json(newUser);
});

app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newUsername = req.body.username;
    const updatedUser = await prisma.Company.update({
      where: { id: id },
      data: { username: newUsername },
    });
    res.json(updatedUser);
  } catch (err) {
    return res.status(502).json({ msg: "unable to update user" });
  }
});

app.get("/get-specific-user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const selectedCompany = await prisma.Company.findUnique({
      where: { id: id },
    });
    return res.json(selectedCompany);
  } catch (err) {
    return res.status(502).json({ msg: "unable to find user" });
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.Company.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

app.post("/create-team/", async (req, res) => {
  try {
    const newTeam = await prisma.team.create({ data: req.body });
    return res.status(200).json(newTeam);
  } catch (err) {
    return res.status(502).json({ msg: "unable to create team" });
  }
});

app.get("/get-team/:id", async (req, res) => {
  try {
    const myTeams = await prisma.team.findMany({
      where: { companyId: req.params.id },
    });
    return res.status(200).json(myTeams);
  } catch (err) {
    res.status(502).json({ error: err });
  }
});

app.put("/update-team/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newLocation = req.body.location;
    const updatedLocation = await prisma.team.update({
      where: { id: id },
      data: { location: newLocation },
    });
    return res.status(200).json(updatedLocation);
  } catch (err) {
    return res.status(502).json({ error: err });
  }
});

app.get("/user-and-teams/:id", async (req, res) => {
  try {
    const getUserAndTeams = await prisma.company.findMany({
      where: { id: req.params.id },
      include: { Teams: true },
    });
    return res.status(200).json(getUserAndTeams);
  } catch (err) {
    return res.status(502).json({ error: err });
  }
});
