import {RequestHandler} from "express";
import {config} from "./config.js";
import * as hp from "./checkhelpers.js";
import * as ec from "./errorclasses.js";
import {createUser, resetUsers} from "./db/queries/users.js";
import {createChirp, retrieveChirps} from "./db/queries/chirps.js";

export const healthzCheck: RequestHandler = (_req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
    };

export const checkNumReqs: RequestHandler = (_req, res, _next) => { //Returns number of received requests in HTML
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`<html>
    <body>
        <h1>Welcome, Chirpy Admin</h1>
        <p>Chirpy has been visited ${config.api.fileServerHits} times!</p>
    </body>
    </html>`
)};

export const reset: RequestHandler = (_req, res, _next) => { //Resets received reqs counter
  config.api.fileServerHits = 0;
  resetUsers();
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("Counter and Users reset successfully");
};

export const createUserHandler: RequestHandler = async (req, res, next) => {
  try{
    const requestBody = req.body.email;

    if (requestBody){
    const newUser = await createUser({email: requestBody});

    return res.status(201).send(JSON.stringify(newUser));
    };
  }catch(err){
    return next(err);
  };
};

export const postChirpHandler: RequestHandler = async (req, res, next) => {
  try{
    const messageBody = req.body;
    console.log(messageBody);

    if (messageBody.body.length > 140){
      return next(new ec.BadRequest("Chirp is too long. Max length is 140"));
    }else if (!messageBody.userId){
      return next(new ec.BadRequest("No userId provided!"));
    }else{ //If no problems are detected above, create Chirp:
      const cleanedBody = hp.cleanBody(messageBody.body);
      const newChirp = await createChirp({body: cleanedBody, userId: messageBody.userId});
      return res.status(201).send(JSON.stringify(newChirp));
    };
  }catch(err){
     return next(err);
  };
};

export const getChirpsHandler: RequestHandler = async (_req, res, next) => {
  try{
    const chirps = await retrieveChirps();
    return res.status(200).send(chirps);

  }catch(err){
    return next(err);
  };
};