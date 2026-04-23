import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error middleware - ",err);
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({
        message: err.message,
        errorCode: err.errorCode,
      });
  }

  return res.status(500).json({ message: "Internal server error" });
};
