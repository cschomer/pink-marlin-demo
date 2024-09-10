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
if (env.PORT !== undefined) {
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
        console.log(
          `🚀 Server is ready at http://localhost:${env.PORT}/graphql`
        );
        console.log(
          `🚀 GQL Playground is ready at http://localhost:${env.PORT}/playground`
        );
      })
      .once("error", (err: any): void => {
        console.error("💀 Error starting the node server", err);
      });
  };

  startServer();
} else {
  const app = express();
  app.use(cors());
  app.use(express.json());
  httpServer = http.createServer(app);

  const startApolloServer = async (app, httpServer) => {
    const server = new ApolloServer({
      typeDefs: await getTypeDefs(),
      resolvers: await getResolvers(),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });

    startApolloServer(app, httpServer);
  };
}
export default httpServer;
