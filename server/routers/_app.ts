/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from "../trpc";
import { brewRouter } from "./brew";
import { discordRouter } from "./discord";

export const appRouter = router({
  brew: brewRouter,
  discord: discordRouter,
});

export type AppRouter = typeof appRouter;
