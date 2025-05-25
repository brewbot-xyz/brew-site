import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
  DISCORD_TOKEN: z.string(),
  LASTFM_API_KEY: z.string(),
  LASTFM_SECRET: z.string(),
  REDIS_URL: z.string().url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("[ENV Error] Invalid environment variables:", env.error.format());
  throw new Error("[ENV Error] Environment variables are incorrectly configured");
}

export default env.data;
