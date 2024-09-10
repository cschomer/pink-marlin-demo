"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const env_1 = __importDefault(require("./env"));
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const express_2 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
let httpServer = undefined;
if (env_1.default.PORT !== undefined) {
    const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: yield (0, schema_1.getTypeDefs)(),
            resolvers: yield (0, resolvers_1.getResolvers)(),
        });
        yield server.start();
        server.applyMiddleware({ app });
        // Middleware
        app.get("*", 
        //@ts-ignore
        (0, graphql_playground_middleware_express_1.default)({
            endpoint: "/graphql",
            env: process.env,
            workspaceName: "Example App",
        }));
        app
            .listen(env_1.default.PORT)
            .once("listening", () => {
            console.log(`🚀 Server is ready at http://localhost:${env_1.default.PORT}/graphql`);
            console.log(`🚀 GQL Playground is ready at http://localhost:${env_1.default.PORT}/playground`);
        })
            .once("error", (err) => {
            console.error("💀 Error starting the node server", err);
        });
    });
    startServer();
}
else {
    const app = (0, express_2.default)();
    app.use((0, cors_1.default)());
    app.use(express_2.default.json());
    httpServer = http_1.default.createServer(app);
    const startApolloServer = (app, httpServer) => __awaiter(void 0, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: yield (0, schema_1.getTypeDefs)(),
            resolvers: yield (0, resolvers_1.getResolvers)(),
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        server.applyMiddleware({ app });
        startApolloServer(app, httpServer);
    });
}
exports.default = httpServer;
//# sourceMappingURL=index.js.map