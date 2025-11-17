import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, "ACCESS_SECRET", { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, "REFRESH_SECRET", { expiresIn: "7d" });
};
