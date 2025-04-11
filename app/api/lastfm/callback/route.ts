import redis from "@/lib/redis";
import crypto from "node:crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("i");
  const token = searchParams.get("token");

  if (!id || !token) return new Response(null, { status: 400 });

  const params = {
    api_key: process.env.LASTFM_API_KEY,
    method: "auth.getSession",
    token,
  };

  const api_sig = crypto.hash(
    "md5",
    Object.entries(params).flat().join("") + process.env.LASTFM_SECRET
  );

  const res = await fetch(
    "http://ws.audioscrobbler.com/2.0?" +
      new URLSearchParams({
        ...params,
        api_sig,
        format: "json",
      }).toString(),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const session = await res.json();

  if (res.ok) {
    redis.hset("lastfm", id, JSON.stringify(session));
  } else {
    return Response.json(session, { status: res.status });
  }

  return new Response(null, { status: 204 });
}
