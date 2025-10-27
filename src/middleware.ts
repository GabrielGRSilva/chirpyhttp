import {RequestHandler} from "express"
import {config} from "./config.js";

export const middlewareFinish: RequestHandler = (req,res,next) => {
    res.on("finish", () => { //Listens for finish events to check their status and log if failed
    const status = res.statusCode;

    if (status < 200 || status > 299){
        console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
            };
        });
    next();
};

export const middlewareHealthzCheck: RequestHandler = (_req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
    };

export const middlewareMetricsInc: RequestHandler = (_req, _res, next) => { //Increments number of received requests
  config.fileServerHits++;
};

export const middlewareCheckNumReqs: RequestHandler = (_req, res, _next) => { //Prints number of received requests
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send(`Hits: ${config.fileServerHits}`);
};

export const middlewareReset: RequestHandler = (_req, res, _next) => { //Resets received reqs counter
  config.fileServerHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("Counter reset successfully");
};