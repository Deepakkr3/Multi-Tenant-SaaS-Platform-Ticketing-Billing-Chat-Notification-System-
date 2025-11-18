import Redis from "ioredis";

export const redisClient = new Redis({
  host: "127.0.0.1", // Redis server IP
  port: 6379, // Default Redis port
  // password: "your_password_if_redis_is_protected"
});

redisClient.on("connect", () => {
  console.log("🟢 Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis connection error:", err);
});
