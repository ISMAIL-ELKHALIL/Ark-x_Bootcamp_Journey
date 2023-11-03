import { Request, Response, NextFunction } from "express";

import { get, merge } from "lodash";

import { getUserBySessionToken } from "../Models/users";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["ISMAIL-AUTH"];

    if (!sessionToken) {
      return res.status(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};
