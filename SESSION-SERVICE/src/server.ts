import dotenv from "dotenv";
import app from "./app";


const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
const port = process.env.PORT;
import { connectRedis } from "./config/redis";

process.on("uncaughtException", (error) => {
  process.exit(1);
});


const server = app.listen(port, async () => {
  await connectRedis();

  console.log("Connected to database axelspace...");
  
  console.log("MongoDB connected successfully...");

  console.log("🚀 Server is listening on port", port);
});

const shutdown = () => {
  console.log("🛑 Received shutdown signal, closing server gracefully...");
  server.close(() => {
    console.log("✅ Closed out remaining connections.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "⚠️ Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
