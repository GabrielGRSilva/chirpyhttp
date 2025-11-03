import "dotenv/config"; console.log("dotenv ok");
import * as cf from "./config.js";  console.log("cf ok");
import express from "express"; console.log("express ok");
import postgres from "postgres"; console.log("postgres ok");
import { drizzle } from "drizzle-orm/postgres-js"; console.log("drizzle ok");
import { migrate } from "drizzle-orm/postgres-js/migrator"; console.log("migrator ok");
import * as mw from "./middleware.js"; console.log("middleware ok");
import * as rh from "./handlers.js"; console.log("handlers ok");
import { errorHandler } from "./errormiddleware.js"; console.log("errorhandlers ok");

console.log("start, platform:", cf.config.api.platform);

async function main() {
  try {
    const migrationClient = postgres(cf.config.db.url, { max: 1 });
    console.log("migrationsFolder:", cf.config.db.migrationConfig.migrationsFolder);
    await migrate(drizzle(migrationClient), cf.config.db.migrationConfig);
    console.log("migrations ok");
  } catch (e) {
    console.error("migration error:", e);
    process.exit(1);
  }

  const app = express();
  console.log("app created");

  app.use("/app", mw.middlewareMetricsInc); console.log("mw1 ok");
  app.use("/app", express.static("./src/app")); console.log("static ok");
  app.use(mw.middlewareFinish); console.log("mw2 ok");
  app.use(express.json()); console.log("json ok");
  app.use(express.urlencoded({ extended: true })); console.log("urlencoded ok");

  app.get("/api/healthz", rh.healthzCheck); console.log("route healthz ok");
  app.post("/api/validate_chirp", rh.jsonCheck); console.log("route validate ok");
  app.post("/api/users", rh.createUserHandler); console.log("route users ok");

  app.get("/admin/metrics", rh.checkNumReqs); console.log("route metrics ok");
  app.post("/admin/reset", rh.reset); console.log("route reset ok");

  app.use(errorHandler); console.log("error handler ok");

  app.listen(8080, () => console.log("listening on 8080"));
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});