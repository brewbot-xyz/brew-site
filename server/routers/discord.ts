import _ from "lodash";

import discord, { OWNER_IDS } from "@/lib/discord";
import { User } from "@/lib/resources";
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";

export const discordRouter = {
  demoUsers: publicProcedure.query(async () => {
    const users = [];
    for (const userId of _.shuffle(OWNER_IDS)) {
      const user = await discord.get<User>(`/users/${userId}`);
      const extension = user.avatar?.startsWith("a_") ? "gif" : "webp";
      const avatarUrl = user.avatar
        ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${extension}?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${
            (parseInt(userId) >> 22) % 6
          }.png`;
      users.push({
        name: user["global_name"] || user["username"],
        avatarUrl,
      });
    }
    return users;
  }),
} satisfies TRPCRouterRecord;
