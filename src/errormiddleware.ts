import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import * as ec from "./errorclasses.js"

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err); //Logs error in console and returns JSON res below
  if (res.headersSent) return next(err); //Guard in case res was already sent

  if(err instanceof ec.BadRequest){
    res.status(400).json({error: err.message});
  }else if(err instanceof ec.Unauthorized){
    res.status(401).json({error: err.message});
  }else if(err instanceof ec.Forbidden){
    res.status(403).json({error: err.message});
  }else if(err instanceof ec.NotFound){
    res.status(404).json({error: err.message});
  }else{
  res.status(500).json({error: "Something went wrong on our end"});
  };
};
