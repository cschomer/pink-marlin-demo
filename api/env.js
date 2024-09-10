"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
//console.log(z.string().parse(process.env.PORT));
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("4000"),
    SWAPI_BASE_URL: zod_1.z.string().url().default("https://swapi.dev/api"),
});
const env = envSchema.parse(process.env);
exports.default = env;
//# sourceMappingURL=env.js.map