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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolvers = void 0;
const load_files_1 = require("@graphql-tools/load-files");
// Provide resolver functions for your schema fields
const getResolvers = () => __awaiter(void 0, void 0, void 0, function* () {
    const resolvers = yield (0, load_files_1.loadFiles)("./src/modules/**/*resolvers.{js,ts}");
    return resolvers;
});
exports.getResolvers = getResolvers;
//# sourceMappingURL=resolvers.js.map