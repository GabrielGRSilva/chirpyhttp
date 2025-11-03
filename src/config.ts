import type { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();//Loads .env stuff like the connection string to the database;

type APIConfig = { //Number of received requests
  fileServerHits: number;
  platform: string;
};

type DBConfig = { //Database info
  url: string;
  migrationConfig: MigrationConfig;
};

export const config = {
  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig: { migrationsFolder: "./src/db/migrations" },
  } satisfies DBConfig,
  api: {
    fileServerHits: 0,
    platform: envOrThrow("PLATFORM"),
  } satisfies APIConfig,
};

function envOrThrow(key: string): string { //Verifies if DB_URL is valid
  const val = process.env[key];
  if (typeof val === "string" && val.length > 0) return val;
  throw new Error(`${key} not found!`);
}; 