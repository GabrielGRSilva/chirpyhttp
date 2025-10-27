import express from "express";
import * as mw from "./middleware.js";

const app = express();

const PORT = 8080;

app.use("/app", mw.middlewareMetricsInc); //Increments requests counter
app.use("/app", express.static("./src/app"));
app.use(mw.middlewareFinish);

app.get("/healthz", mw.middlewareHealthzCheck); //Checks server status
app.get("/reset", mw.middlewareReset); //Resets reqs counter
app.get("/metrics", mw.middlewareCheckNumReqs); //Checks num of received reqs

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});