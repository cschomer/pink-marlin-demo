import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";
import { StarWarsCharacter, Gender } from "../../generated/graphql";
import axios from "axios";
import env from "../../env";

const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
  person: async (_: any, { id }: { id: string }) => {
    const response = await axios.get(`${env.SWAPI_BASE_URL}/people/${id}/`);
    return response.data;
  },
  planet: async (_: any, { id }: { id: string }) => {
    const response = await axios.get(`${env.SWAPI_BASE_URL}/planets/${id}/`);
    return response.data;
  },
  swapiCharacterById: async (
    _: any,
    { id }: { id: string }
  ): Promise<StarWarsCharacter> => {
    try {
      const { data }: { data: StarWarsCharacter } = await axios.get(
        `${env.SWAPI_BASE_URL}/people/${id}/`
      );

      return data;
    } catch (error) {
      console.error("Error fetching character:", error);
      throw new Error("Failed to fetch character");
    }
  },
  swapiCharactersByIds: async (
    _: any,
    { ids }: { ids: string[] }
  ): Promise<StarWarsCharacter[]> => {
    try {
      const characterPromises = ids.map((id) =>
        axios
          .get(`${env.SWAPI_BASE_URL}/people/${id}/`)
          .then((response) => response.data)
      );
      const characters = await Promise.all(characterPromises);
      return characters;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw new Error("Failed to fetch characters");
    }
  },
};

const StarWarsCharacter = {
  gender: (character: StarWarsCharacter): Gender => {
    switch ((character?.gender ?? "unknown").toLowerCase()) {
      case "male":
        return Gender.Male;
      case "female":
        return Gender.Female;
      default:
        return Gender.Unknown;
    }
  },
};

// You can add new Object Resolvers to the default export and the server will pick them up automatically
export default {
  Query,
  StarWarsCharacter,
};
