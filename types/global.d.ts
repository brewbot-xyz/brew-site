declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test"
      readonly PORT?: string
      readonly REDIS_URL: string
      readonly DISCORD_TOKEN: string
      readonly LASTFM_API_KEY: string
      readonly LASTFM_SECRET: string
    }
  }
}

export {}
