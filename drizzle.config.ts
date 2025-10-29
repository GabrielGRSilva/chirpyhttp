import { defineConfig } from "drizzle-kit";
import * as cf from "./src/config";

export default defineConfig({
  schema: "src/database/schema.ts",
  out: "src/database/genfiles",
  dialect: "postgresql",
  dbCredentials: {
    url: cf.config.db.url,
  },
});