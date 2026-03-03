import crypto from "node:crypto";
import type { TRPCRouterRecord } from "@trpc/server";
import redis from "@/lib/redis";
import {
  type Category,
  CategoryName,
  type Command,
  type Shard,
} from "@/lib/resources";
import { publicProcedure } from "../trpc";

export const brewRouter = {
  commandCategories: publicProcedure.query(async () => {
    const commands = await redis.hgetall("commands");
    return Object.entries(commands)
      .filter(([name]) => !["dev", "jishaku"].includes(name))
      .map<Category>(([name, data]) => ({
        name: name.toUpperCase() as keyof typeof CategoryName,
        commands: (JSON.parse(data) as Omit<Command, "key">[]).map(
          (command) => ({
            ...command,
            key: crypto.randomUUID(),
          }),
        ),
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
        shard_id: Number.parseInt(shard_id, 10),
        ...(JSON.parse(data.replace("Infinity", "-1")) as Omit<
          Shard,
          "shard_id"
        >),
      })),
    };
  }),
} satisfies TRPCRouterRecord;
