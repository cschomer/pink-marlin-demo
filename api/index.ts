import { ApolloServer } from "apollo-server-express";
import Express from "express";
import playgroundMiddleware from "graphql-playground-middleware-express";
import { getResolvers } from "./resolvers";
import { getTypeDefs } from "./schema";
import env from "./env";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
let httpServer = undefined;

const app = express();
app.use(cors());
app.use(express.json());
httpServer = http.createServer(app);

const startApolloServer = async (app: any, httpServer: any) => {
  const server = new ApolloServer({
    typeDefs: await getTypeDefs(),
    resolvers: await getResolvers(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  startApolloServer(app, httpServer);
};

export default httpServer;
