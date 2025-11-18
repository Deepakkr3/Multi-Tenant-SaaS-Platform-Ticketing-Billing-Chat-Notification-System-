import { DataSource } from "typeorm";
import { User } from "../entities/User";
import dotenv from "dotenv";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";


const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.AUTH_USER_DB_HOST,
  port: 3306,
  username: process.env.AUTH_USER_DB_USERNAME,
  password: process.env.AUTH_USER_DB_PASSWORD,
  database: process.env.AUTH_ORDERS_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    // isProduction ? "dist/models/orderModel/*{.js}" : "src/models/orderModel/*{.js,.ts}"
    User,
    Role,
    Permission
  ],
});
