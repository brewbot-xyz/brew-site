import redis from "@/lib/redis";
import { absoluteUrl, generateRandomString } from "@/lib/utils";

import { APIUser, RESTPostOAuth2AccessTokenResult } from "discord-api-types/v10";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) return new Response(null, { status: 400 });

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: absoluteUrl("/api/discord/callback"),
      scope: "identify",
    }).toString(),
  });

  if (!tokenResponse.ok) {
    return new Response(JSON.stringify(await tokenResponse.json()), {
      status: tokenResponse.status,
    });
  }

  const session = (await tokenResponse.json()) as RESTPostOAuth2AccessTokenResult;

  const userResult = await fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${session.token_type} ${session.access_token}`,
    },
  });

  if (userResult.ok) {
    const user = (await userResult.json()) as APIUser;
    const state = generateRandomString();
    redis.hset("state", user.id, state);
    // redis.call("HEXPIRE", "discord", session.expires_in, "FIELDS", 1, user.id);
    return Response.redirect(
      absoluteUrl(
        "/oauth_callback?" +
          new URLSearchParams({
            access_token: session.access_token,
            token_type: session.token_type,
            state,
          }),
      ),
    );
  } else {
    return Response.json(session, { status: userResult.status });
  }
}
