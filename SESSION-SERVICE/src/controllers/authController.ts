import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redis from "../config/redis.js";
import { generateAccessToken, generateRefreshToken } from "../auth/jwt.js";

// ----------------------------------------
// FAKE USER (for practice only)
// ----------------------------------------
let user: { id: string; email: string; password: string } | null = null;

async function initUser() {
  const hashedPassword = await bcrypt.hash("password", 10);

  user = {
    id: "101",
    email: "test@example.com",
    password: hashedPassword,
  };

  console.log("🔥 Dummy user created:", user);
}

// Initialize only ONCE when server starts
initUser();

// ----------------------------------------
// LOGIN
// ----------------------------------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!user) return res.status(500).json({ error: "User not initialized" });

  if (email !== user.email) {
    return res.status(404).json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  // Store session in Redis (refresh token)
  await redis.set(`session:${user.id}`, refreshToken, {
    EX: 60 * 60 * 24 * 7, // 7 days
  });

  return res.json({ accessToken, refreshToken });
};

// ----------------------------------------
// REFRESH TOKEN
// ----------------------------------------
export const refreshSession = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token required" });
  }

  try {
    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_SECRET!);

    const storedToken = await redis.get(`session:${decoded.id}`);
    if (storedToken !== refreshToken) {
      return res.status(401).json({ error: "Invalid session or expired" });
    }

    const newAccessToken = generateAccessToken({ id: decoded.id });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

// ----------------------------------------
// LOGOUT
// ----------------------------------------
export const logout = async (req: Request, res: Response) => {
  const { userId } = req.body;

  await redis.del(`session:${userId}`);

  return res.json({ message: "Logged out successfully" });
};
