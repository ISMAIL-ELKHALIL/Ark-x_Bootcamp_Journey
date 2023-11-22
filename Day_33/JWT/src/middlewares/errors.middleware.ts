import { Response, Request, NextFunction } from "express";

interface Error {
  status?: number;
  message?: string;
}

export const errorsHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).send(err.message || "Something went wrong");
};
