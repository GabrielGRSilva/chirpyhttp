import express from "express";
import * as mw from "./middleware";

const app = express();

const PORT = 8080;

app.use("/app", express.static("./src/app"));

app.use(mw.middlewareFinish);

app.get("/healthz", mw.middlewareHealthzCheck(req, res));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

