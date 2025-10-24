import express from "express";

const app = express();

const PORT = 8080;

app.use("/app", express.static("./src/app"));

app.use((req, res, next) => {
  res.on("finish", () => { //Listens for finish events to check their status and log if failed
  const status = res.statusCode

  if (status < 200 || status > 299){
    console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
      };
    });
    next();
});

app.get("/healthz", (req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

