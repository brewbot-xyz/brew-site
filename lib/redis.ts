import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("error", (error: unknown) => {
  console.warn("[Redis Error] Failed to connect: ", error);
});

export default redis;
