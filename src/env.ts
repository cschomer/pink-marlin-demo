import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
//console.log(z.string().parse(process.env.PORT));
const envSchema = z.object({
  PORT: z.string().default("4000"),
  SWAPI_BASE_URL: z.string().url().default("https://swapi.dev/api"),
});

const env = envSchema.parse(process.env);

export default env;
