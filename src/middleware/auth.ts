import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export interface JwtPayloadCustom {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decodedRaw = jwt.verify(token as string, config.jwtSecret as string);

    const decoded = decodedRaw as unknown;

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("id" in decoded) ||
      !("email" in decoded) ||
      !("role" in decoded)
    ) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    const payload = decoded as JwtPayloadCustom;

    (req as any).user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
