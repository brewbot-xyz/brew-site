import { DiscordClient } from "@/lib/discord";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const createContext = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { userId: null, oauth: null, discord: null };
  }
  const client = await clerkClient();

  const {
    data: [oauth],
  } = await client.users.getUserOauthAccessToken(userId, "discord");

  console.log(oauth);

  const discord = new DiscordClient(`Bearer ${oauth.token}`);

  return { userId, oauth, discord };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
