// src/config.ts
import "dotenv/config";
import type { MigrationConfig } from "drizzle-orm/migrator";
import { resolve } from "node:path";

export const config = {
  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig: {
      migrationsFolder: resolve(process.cwd(), "./src/db/genfiles"),
    } satisfies MigrationConfig,
  },
  api: { fileServerHits: 0, platform: envOrThrow("PLATFORM") },
};

function envOrThrow(k: string) {
  const v = process.env[k];
  if (v) return v;
  throw new Error(`${k} not found!`);
}