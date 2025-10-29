import { defineConfig } from "drizzle-kit";
import {connectionString} from "./secrets/connectionstring"

export default defineConfig({
  schema: "src/database/schema.ts",
  out: "src/database/genfiles",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});