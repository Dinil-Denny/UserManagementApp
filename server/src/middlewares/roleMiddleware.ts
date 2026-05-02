import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { AppError } from "../utils/AppError";

export const roleMiddleware = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log('role in role middleware: ',req.user?.role);
    if (!req.user) {
      return next(new AppError("User not authenticated", 401));
    }
    if (req.user.role !== role) {
      return next(new AppError("Access denied", 403));
    }
    next();
  };
};
