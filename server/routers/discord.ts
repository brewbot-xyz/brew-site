import _ from "lodash";

import bot, { OWNER_IDS } from "@/lib/discord";
import { APIGuild, Guild, User } from "@/lib/resources";
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";

function mountainSort(arr: Guild[]): Guild[] {
  arr.sort((a, b) => a.memberCount - b.memberCount);
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  right.reverse();
  return left.concat(right);
}

export const discordRouter = {
  demoUsers: publicProcedure.query(async () => {
    const users = [];
    for (const userId of _.shuffle(OWNER_IDS)) {
      const user = await bot.get<User>(`/users/${userId}`);
      const extension = user.avatar?.startsWith("a_") ? "gif" : "webp";
      const avatarUrl = user.avatar
        ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${extension}?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${(parseInt(userId) >> 22) % 6}.png`;
      users.push({
        name: user["global_name"] || user["username"],
        avatarUrl,
      });
    }
    return users;
  }),
  publicGuilds: publicProcedure.query(async () => {
    const params = new URLSearchParams({
      with_counts: "true",
    });
    const guilds = await bot.get<APIGuild[]>("/users/@me/guilds" + `?${params.toString()}`);
    return mountainSort(
      guilds
        .filter(
          (x) =>
            x.features.includes("COMMUNITY") &&
            parseInt(x.permissions || "0") >= 0x0000000000000008 &&
            (x.approximate_member_count || 0) > 1000,
        )
        .map((x) => {
          const extension = x.icon?.startsWith("a_") ? "gif" : "webp";
          const iconUrl = x.icon
            ? `https://cdn.discordapp.com/icons/${x.id}/${x.icon}.${extension}?size=256`
            : `https://cdn.discordapp.com/embed/avatars/${(parseInt(x.id) >> 22) % 6}.png`;
          return {
            id: x.id,
            name: x.name,
            iconUrl,
            memberCount: x.approximate_member_count || 0,
            owner: x.owner === true,
            features: x.features,
            permissions: x.permissions || "0",
          } satisfies Guild;
        })
        .sort((a, b) => {
          return b.memberCount - a.memberCount;
        }),
    );
  }),
} satisfies TRPCRouterRecord;
