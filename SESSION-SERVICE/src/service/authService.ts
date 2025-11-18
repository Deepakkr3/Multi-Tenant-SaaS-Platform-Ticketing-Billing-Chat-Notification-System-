import bcrypt from "bcrypt";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { redisClient } from "../config/redis";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "../entities/Role";



const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });



class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private roleRepo = AppDataSource.getRepository(Role);

  async register(email: string, password: string, roleName: string = "USER") {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new Error("User already exists");

    const role = await this.roleRepo.findOne({ where: { name: roleName } });
    if (!role) throw new Error("Role not found");

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({ email, password: hashedPwd, role });

    return await this.userRepo.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ["role", "role.permissions"],
    });

    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { id: user.id, email },
      process.env.ACCESS_SECRET!,
      {
        expiresIn: "1h",
      }
    );

      const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    await redisClient.set(`refresh:${user.id}`, refreshToken);

    return { token, user };

  }
}

export default new AuthService();


