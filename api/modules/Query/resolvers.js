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
const database_1 = __importDefault(require("../../services/database"));
const arrays_1 = require("../../services/arrays");
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../../env"));
const Query = {
    peopleByName: (_, { name }) => __awaiter(void 0, void 0, void 0, function* () {
        const matchingPeople = arrays_1.people.filter((person) => person.name.toLowerCase() === name.toLowerCase());
        return matchingPeople.map((person) => (Object.assign(Object.assign({}, person), { favoriteCharacters: [] })));
    }),
};
const Person = {
    favoriteCharacters: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const favoriteIds = ((_a = database_1.default[parent.name.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.favoriteSwapiCharacterIds) || [];
        const characters = yield Promise.all(favoriteIds.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${env_1.default.SWAPI_BASE_URL}/people/${id}/`);
                return response.data;
            }
            catch (error) {
                console.error(`Error fetching character with id ${id}:`, error);
                return null;
            }
        })));
        return characters.filter((character) => character !== null);
    }),
};
exports.default = {
    Query,
    Person,
};
//# sourceMappingURL=resolvers.js.map