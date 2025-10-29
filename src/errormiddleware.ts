import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import * as ec from "./errorclasses.js";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(err);

  switch (true as const) {
    case err instanceof ec.BadRequest:
      return res.status(400).json({ error: err.message });
    case err instanceof ec.Unauthorized:
      return res.status(401).json({ error: err.message });
    case err instanceof ec.Forbidden:
      return res.status(403).json({ error: err.message });
    case err instanceof ec.NotFound:
      return res.status(404).json({ error: err.message });
    default:
      console.error(err); // log unexpected errors
      return res.status(500).json({ error: "Internal Server Error" });
  }
};