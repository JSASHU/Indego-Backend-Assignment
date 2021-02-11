import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { tokenInfo } from "../config";
import { AccessTokenError } from "../core/ApiError";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, tokenInfo.accessTokenSecretKey);
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (e) {
    //If token is not valid, respond with 401 (unauthorized)
    next(new AccessTokenError(e.message));
  }
};
