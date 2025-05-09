import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();

  const {data: [oauth]} = await client.users.getUserOauthAccessToken(userId, "discord");

  if (!oauth) {
    return NextResponse.json({ error: "No Discord OAuth token found" }, { status: 404 });
  }

  const user = await client.users.getUser(userId);
  const id = user.externalAccounts.find(x => x.provider === oauth.provider)?.externalId


  const discordResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${oauth.token}`,
    },
  });

  if (!discordResponse.ok) {
    return NextResponse.json({ error: "Failed to fetch Discord user data" }, { status: discordResponse.status });
  }

  const discordUser = await discordResponse.json();

  return NextResponse.json({ id, user, oauth, discordUser, sessionClaims });
}
