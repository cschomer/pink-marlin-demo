import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";
import { Person } from "../../generated/graphql";
import favoriteCharacters from "../../services/database";
import { people } from "../../services/arrays";
import axios from "axios";
import env from "../../env";

const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
  peopleByName: async (_, { name }) => {
    const matchingPeople = people.filter(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );

    return matchingPeople.map((person) => ({
      ...person,
      favoriteCharacters: [], // This will be populated by the Person.favoriteCharacters resolver
    }));
  },
};

const Person = {
  favoriteCharacters: async (parent: Person) => {
    const favoriteIds =
      favoriteCharacters[parent.name.toLowerCase()]
        ?.favoriteSwapiCharacterIds || [];

    const characters = await Promise.all(
      favoriteIds.map(async (id) => {
        try {
          const response = await axios.get(
            `${env.SWAPI_BASE_URL}/people/${id}/`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching character with id ${id}:`, error);
          return null;
        }
      })
    );

    return characters.filter((character) => character !== null);
  },
};

export default {
  Query,
  Person,
};
