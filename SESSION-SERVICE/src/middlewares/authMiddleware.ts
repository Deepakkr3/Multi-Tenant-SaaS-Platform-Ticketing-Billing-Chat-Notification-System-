import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";



const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
const port = process.env.PORT;


export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_SECRET!);

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: decoded.id },
      relations: ["role", "role.permissions"],
    });

    if (!user) return res.status(401).json({ message: "Invalid user" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

