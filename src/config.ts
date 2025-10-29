process.loadEnvFile();//Loads .env stuff like the connection string to the database;

const envObj = process.env;

type APIConfig = { //Number of received requests
  fileServerHits: number;
  dbURL: string;
};

export const config: APIConfig = { //Obj to hold stateful data
    fileServerHits: 0,
    dbURL: envOrThrow("DB_URL"),
};

function envOrThrow(key: string): string { //Verifies if DB_URL is valid
  const val = process.env[key];
  if (typeof val === "string" && val.length > 0) return val;
  throw new Error(`${key} not found!`);
};