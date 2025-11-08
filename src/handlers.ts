import {RequestHandler} from "express";
import {config} from "./config.js";
import * as hp from "./checkhelpers.js";
import * as ec from "./errorclasses.js";
import {createUser, resetUsers} from "./db/queries/users.js";

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

    const jsonUser = JSON.stringify(newUser);

    return res.status(201).send(jsonUser);
    };
  }catch(err){
    return next(err);
  };
};

export const postChirpHandler: RequestHandler = async (req, res, next) => {
  try{
    const messageBody = req.body.body;
    console.log(messageBody);

    if (messageBody.length > 140){
      const err = new ec.BadRequest("Chirp is too long. Max length is 140");
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


/* ACCEPTS JSON LIKE THIS:
{
  "body": "Hello, world!",
  "userId": "123e4567-e89b-12d3-a456-426614174000"
}
  */