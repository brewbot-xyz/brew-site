import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("error", (error: unknown) => {
  console.warn("[Redis] Error connecting", error);
});

export default redis;
