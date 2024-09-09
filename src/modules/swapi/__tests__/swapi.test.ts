import { ApolloServer, gql } from "apollo-server";
import resolvers from "../resolvers";
import env from "../../../env";
import axios from "axios";

import { getTypeDefs } from "../../../schema";

// Mock the axios module
jest.mock("axios");

describe("swapiCharacterById Query", () => {
  // Mock the axios module
  jest.mock("axios");

  const { SWAPI_BASE_URL } = env;
  const GET_SWAPI_CHARACTER_BY_ID = gql`
    query GetSwapiCharacterById($id: ID!) {
      swapiCharacterById(id: $id) {
        name
        height
        mass
        gender
      }
    }
  `;

  let server: ApolloServer;

  beforeAll(async () => {
    const typeDefs = await getTypeDefs();
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it("fetches a character by ID", () => {
    const characterData = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      gender: "male",
    };

    // Mock the axios response
    (axios.get as jest.Mock).mockResolvedValue({ data: characterData });

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

        expect(axios.get).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/1/`);
      });
  });
});
