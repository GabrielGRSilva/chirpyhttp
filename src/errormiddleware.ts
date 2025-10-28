import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err); //Logs error in console and returns JSON res below
  if (res.headersSent) return next(err);
  res.status(500).json({error: "Something went wrong on our end"});
};
