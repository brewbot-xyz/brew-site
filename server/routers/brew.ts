import redis from "@/lib/redis";
import { CategoryName, Command, type Category, type Shard } from "@/lib/resources";
import type { TRPCRouterRecord } from "@trpc/server";
import crypto from "node:crypto";
import { protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@/lib/prisma";

export const brewRouter = {
  commandCategories: publicProcedure.query(async () => {
    const commands = await redis.hgetall("commands");
    return Object.entries(commands)
      .filter(([name]) => !["dev", "jishaku"].includes(name))
      .map<Category>(([name, data]) => ({
        name: name.toUpperCase() as keyof typeof CategoryName,
        commands: (JSON.parse(data) as Omit<Command, "key">[]).map((command) => ({
          ...command,
          key: crypto.randomUUID(),
        })),
      }))
      .sort((a: Category, b: Category) => {
        return Object.values(CategoryName).includes(a.name)
          ? Object.values(CategoryName).indexOf(a.name) -
              Object.values(CategoryName).indexOf(b.name)
          : 1;
      });
  }),
  stats: publicProcedure.query(async () => {
    const shards = await redis.hgetall("shards");
    return {
      shards: Object.entries(shards).map<Shard>(([shard_id, data]) => ({
        shard_id: parseInt(shard_id, 10),
        ...(JSON.parse(data.replace("Infinity", "-1")) as Omit<Shard, "shard_id">),
      })),
    };
  }),
  prefix: protectedProcedure.input(z.object({ guildId: z.string() })).query(async ({ input }) => {
    const prefix = await db.prefixes.findFirst({ where: { server_id: input.guildId } });
    return prefix?.prefix || ",";
  }),
  setPrefix: protectedProcedure
    .input(z.object({ guildId: z.string(), prefix: z.string() }))
    .mutation(async ({ input }) => {
      await db.prefixes.upsert({
        where: { server_id: input.guildId },
        create: { server_id: input.guildId, prefix: input.prefix },
        update: { prefix: input.prefix },
      });
      return true;
    }),
  setServerVars: protectedProcedure
    .input(
      z.object({
        guildId: z.string(),
        config: z.record(z.any()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updateResult = await db.server_vars.update({
          where: { server_id: BigInt(input.guildId) },
          data: input.config,
        });
        return updateResult;
      } catch (error) {
        console.error(error);
        return {};
      }
    }),

  getServerVars: protectedProcedure
    .input(z.object({ guildId: z.string() }))
    .query(async ({ input }) => {
      try {
        const results = await db.server_vars.findUnique({
          where: { server_id: BigInt(input.guildId) },
        });
        console.log(123, results);
        return results;
      } catch (error) {
        console.error(error);
        return null;
      }
    }),
} satisfies TRPCRouterRecord;
