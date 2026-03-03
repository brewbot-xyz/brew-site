declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DISCORD_TOKEN: string;
      readonly LASTFM_API_KEY: string;
      readonly LASTFM_API_SECRET: string;
      readonly NODE_ENV: "development" | "production" | "test";
      readonly PORT?: string;
      readonly REDIS_URL: string;
      readonly NEXT_PUBLIC_APP_ENV: "development" | "production" | "test";
    }
  }
}

export {};
