import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

if (process.env.NEXT_PUBLIC_APP_ENV != null) {
  console.warn(
    "[env] NEXT_PUBLIC_APP_ENV is ignored and overridden by NEXTJS_ENV.",
  );
}

export const env = createEnv({
  server: {
    NEXTJS_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    HOSTNAME: z.string().default("0.0.0.0"),
    PORT: z.coerce.number().default(3000),
    DISCORD_TOKEN: z.string(),
    LASTFM_API_KEY: z.string(),
    LASTFM_API_SECRET: z.string(),
    REDIS_URL: z.url(),
    KEEP_ALIVE_TIMEOUT: z.coerce.number().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["development", "test", "production"]),
  },
  runtimeEnv: {
    NEXTJS_ENV: process.env.NEXTJS_ENV,
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    LASTFM_API_KEY: process.env.LASTFM_API_KEY,
    LASTFM_API_SECRET: process.env.LASTFM_API_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    KEEP_ALIVE_TIMEOUT: (() => {
      let keepAliveTimeout = process.env.KEEP_ALIVE_TIMEOUT
        ? parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)
        : undefined;

      if (
        keepAliveTimeout !== undefined &&
        (Number.isNaN(keepAliveTimeout) ||
          !Number.isFinite(keepAliveTimeout) ||
          keepAliveTimeout < 0)
      ) {
        keepAliveTimeout = undefined;
      }

      return keepAliveTimeout;
    })(),
    NEXT_PUBLIC_APP_ENV: process.env.NEXTJS_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
