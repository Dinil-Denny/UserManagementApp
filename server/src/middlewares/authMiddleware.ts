import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: {id:string, role:string};
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('authHeader-authMiddleware:',authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Not authorized, no token provided", 401));
    };

    const token = req.headers.authorization?.split(" ")[1];
    console.log('token in authMiddleware:',token);
    if (!token) throw new AppError("Not authorized", 401);
    //we encoded user's _id and role in jwt access token. when docoded we get those in an object and we attach it with the req using req.user
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!); 
    console.log('decoded:',decoded);
    //the decoded object also contain 2 extra keys - 'iat'&'exp'. we neglect it and populate req.user in the given object model
    req.user = decoded as {id:string, role:string}; 
    next();
  } catch (error) {
    next(error);
  }
};
