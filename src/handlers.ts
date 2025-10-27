import {RequestHandler} from "express"
import {config} from "./config.js";

export const healthzCheck: RequestHandler = (_req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
    };

export const checkNumReqs: RequestHandler = (_req, res, _next) => { //Prints number of received requests
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send(`Hits: ${config.fileServerHits}`);
};

export const reset: RequestHandler = (_req, res, _next) => { //Resets received reqs counter
  config.fileServerHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("Counter reset successfully");
};