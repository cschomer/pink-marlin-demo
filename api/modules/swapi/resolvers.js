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
const graphql_1 = require("../../generated/graphql");
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../../env"));
const Query = {
    person: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${env_1.default.SWAPI_BASE_URL}/people/${id}/`);
        return response.data;
    }),
    planet: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${env_1.default.SWAPI_BASE_URL}/planets/${id}/`);
        return response.data;
    }),
    swapiCharacterById: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${env_1.default.SWAPI_BASE_URL}/people/${id}/`);
            return data;
        }
        catch (error) {
            console.error("Error fetching character:", error);
            throw new Error("Failed to fetch character");
        }
    }),
    swapiCharactersByIds: (_, { ids }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const characterPromises = ids.map((id) => axios_1.default
                .get(`${env_1.default.SWAPI_BASE_URL}/people/${id}/`)
                .then((response) => response.data));
            const characters = yield Promise.all(characterPromises);
            return characters;
        }
        catch (error) {
            console.error("Error fetching characters:", error);
            throw new Error("Failed to fetch characters");
        }
    }),
};
const StarWarsCharacter = {
    gender: (character) => {
        var _a;
        switch (((_a = character === null || character === void 0 ? void 0 : character.gender) !== null && _a !== void 0 ? _a : "unknown").toLowerCase()) {
            case "male":
                return graphql_1.Gender.Male;
            case "female":
                return graphql_1.Gender.Female;
            default:
                return graphql_1.Gender.Unknown;
        }
    },
};
// You can add new Object Resolvers to the default export and the server will pick them up automatically
exports.default = {
    Query,
    StarWarsCharacter,
};
//# sourceMappingURL=resolvers.js.map