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

export const middlewareMetricsInc: RequestHandler = (_req, _res, next) => { //Increments number of received requests
  config.fileServerHits++;
  next();
};