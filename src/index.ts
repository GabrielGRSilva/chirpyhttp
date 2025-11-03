import express from "express";
import * as mw from "./middleware.js";
import * as rh from "./handlers.js"
import {errorHandler} from "./errormiddleware.js"
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import * as cf from "./config.js"

const migrationClient = postgres(cf.config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), cf.config.db.migrationConfig);

const app = express();

const PORT = 8080;

app.use("/app", mw.middlewareMetricsInc); //Increments requests counter
app.use("/app", express.static("./src/app"));
app.use(mw.middlewareFinish);
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/api/healthz", rh.healthzCheck); //Checks server status

app.post("/api/validate_chirp", rh.jsonCheck); //Checks if message sent to app is valid

app.post("/api/users", rh.createUserHandler);

//ADMIN ENDPOINTS BELOW

app.get("/admin/metrics", rh.checkNumReqs); //Checks num of received reqs

app.post("/admin/reset", rh.reset); //Resets reqs counter

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);