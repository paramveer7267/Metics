import jwt from "jsonwebtoken";
import { Response } from "express";
import { envVars } from "../config/envVars.ts"; // Ensure this file has proper TypeScript typing too

export const generateTokenAndSetCookie = (
  userId: string,
  role: string,
  res: Response
): string => {
  const token = jwt.sign(
    { userId,role },
    envVars.JWT_SECRET as string,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict",
    secure: envVars.NODE_ENV !== "development",
  });

  return token;
};
