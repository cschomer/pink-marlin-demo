import { ApolloServer } from "apollo-server-express";
import Express from "express";
import playgroundMiddleware from "graphql-playground-middleware-express";
import { getResolvers } from "./resolvers";
import { getTypeDefs } from "./schema";
import env from "./env";

const startServer = async () => {
  const app = Express();
  const server = new ApolloServer({
    typeDefs: await getTypeDefs(),
    resolvers: await getResolvers(),
  });

  await server.start();

  server.applyMiddleware({ app });
  // Middleware
  app.get(
    "*",
    //@ts-ignore
    playgroundMiddleware({
      endpoint: "/graphql",
      env: process.env,
      workspaceName: "Example App",
    })
  );

  app
    .listen(env.PORT)
    .once("listening", () => {
      console.log(`🚀 Server is ready at http://localhost:${env.PORT}/graphql`);
      console.log(
        `🚀 GQL Playground is ready at http://localhost:${env.PORT}/playground`
      );
    })
    .once("error", (err: any): void => {
      console.error("💀 Error starting the node server", err);
    });
};

startServer();
