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
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("../resolvers"));
const env_1 = __importDefault(require("../../../env"));
const axios_1 = __importDefault(require("axios"));
const schema_1 = require("../../../schema");
// Mock the axios module
jest.mock("axios");
describe("swapiCharacterById Query", () => {
    // Mock the axios module
    jest.mock("axios");
    const { SWAPI_BASE_URL } = env_1.default;
    const GET_SWAPI_CHARACTER_BY_ID = (0, apollo_server_1.gql) `
    query GetSwapiCharacterById($id: ID!) {
      swapiCharacterById(id: $id) {
        name
        height
        mass
        gender
      }
    }
  `;
    let server;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const typeDefs = yield (0, schema_1.getTypeDefs)();
        server = new apollo_server_1.ApolloServer({
            typeDefs,
            resolvers: resolvers_1.default,
        });
    }));
    it("fetches a character by ID", () => {
        const characterData = {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            gender: "male",
        };
        // Mock the axios response
        axios_1.default.get.mockResolvedValue({ data: characterData });
        server
            .executeOperation({
            query: GET_SWAPI_CHARACTER_BY_ID,
            variables: { id: "1" },
        })
            .then((res) => {
            expect(res.errors).toBeUndefined();
            expect(res.data).toEqual({
                swapiCharacterById: {
                    name: "Luke Skywalker",
                    height: "172",
                    mass: "77",
                    gender: "MALE",
                },
            });
            expect(axios_1.default.get).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/1/`);
        });
    });
});
//# sourceMappingURL=swapi.test.js.map