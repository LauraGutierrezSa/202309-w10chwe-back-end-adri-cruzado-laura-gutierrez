import type CustomError from "../../../CustomError/CustomError";
import { type NextFunction, type Request, type Response } from "express";

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(404).json({ error: "User not found" });
};
