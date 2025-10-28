import {RequestHandler} from "express"
import {config} from "./config.js";
import * as hp from "./checkhelpers.js"
import {errorHandler} from "./errormiddleware.js"

export const healthzCheck: RequestHandler = (_req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
    };

export const checkNumReqs: RequestHandler = (_req, res, _next) => { //Returns number of received requests in HTML
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`<html>
    <body>
        <h1>Welcome, Chirpy Admin</h1>
        <p>Chirpy has been visited ${config.fileServerHits} times!</p>
    </body>
    </html>`
)};

export const reset: RequestHandler = (_req, res, _next) => { //Resets received reqs counter
  config.fileServerHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("Counter reset successfully");
};

export const jsonCheck: RequestHandler = (req, res, next) => { //Checks if post message is valid

try{
  const messageBody = req.body.body;

  if (messageBody.length > 140){
    const err = new Error("Something went wrong on our end");
    return next(err);
  }
  else{
    const cleanedBody = hp.cleanBody(messageBody);
    return res.status(200).send(hp.jsonValidDataAnswer(cleanedBody));
  };
  }catch(err){
    return next(err);
  };
};
