"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LatencyGraph from "@/app/status/latency-graph";
import Navbar from "@/components/navbar";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";

import moment from "moment";
import { useState } from "react";
import { BsHeartPulseFill, BsSearch } from "react-icons/bs";
import { FaArrowsRotate, FaChartLine, FaClock, FaServer, FaUsers } from "react-icons/fa6";

function isValidSnowflake(snowflake: string): boolean {
  if (!/^\d{17,19}$/.test(snowflake)) {
    return false;
  }

  const snowflakeBigInt = BigInt(snowflake);

  const DISCORD_EPOCH = 1420070400000n;
  const timestamp = (snowflakeBigInt >> 22n) + DISCORD_EPOCH;

  const currentTime = BigInt(Date.now());
  if (timestamp > currentTime || timestamp < DISCORD_EPOCH) {
    return false;
  }

  const workerId = (snowflakeBigInt & 0x3e0000n) >> 17n;
  if (workerId < 0n || workerId > 31n) {
    return false;
  }

  const processId = (snowflakeBigInt & 0x1f000n) >> 12n;
  if (processId < 0n || processId > 31n) {
    return false;
  }

  const increment = snowflakeBigInt & 0xfffn;
  if (increment < 0n || increment > 4095n) {
    return false;
  }

  return true;
}

export default function Status() {
  const [shardId, setShardId] = useState<number | null>(null);

  const {
    data: { shards },
    refetch,
  } = trpc.brew.stats.useQuery(undefined, {
    initialData: { shards: [] },
    refetchInterval: 30_000,
  });
  if (!shards.length) refetch();

  const updateShardId = (value: string) => {
    if (!isValidSnowflake(value)) return setShardId(null);
    setShardId(Number((BigInt(value) >> 22n) % BigInt(shards.length)));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center antialiased">
      <Navbar>
        <div className="my-4 flex h-[52px] w-full justify-between px-4 md:my-10 md:px-10">
          <div className="flex items-center text-3xl font-bold">
            <BsHeartPulseFill className="mr-2" />
            <span className="flex md:hidden xl:flex">Status</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground pointer-events-auto">
            <Input
              id="name"
              placeholder="Guild ID"
              size="sm"
              value={shardId || undefined}
              onChange={(e) => updateShardId(e.target.value)}
            />
            <Button variant="secondary" size="icon">
              <BsSearch />
            </Button>
          </div>
        </div>
      </Navbar>
      <div className="md:hidden fixed inset-x-0 top-0 z-50 flex w-full justify-between px-8 py-4 md:px-10 backdrop-blur-md">
        <div className="flex items-center text-3xl font-bold">
          <span className="flex md:hidden xl:flex">Status</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Input
            id="name"
            placeholder="Guild ID"
            size="sm"
            value={shardId || undefined}
            onChange={(e) => updateShardId(e.target.value)}
          />
          <Button variant="secondary" size="icon">
            <BsSearch />
          </Button>
        </div>
      </div>
      <div className="mt-20 mb-32 md:my-32 grid w-full max-w-6xl grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3">
        {shards.map((s) => (
          <Card
            key={s.shard_id}
            variant="greyscale"
            className={cn(
              "mx-auto w-full ring-offset-background transition-shadow",
              shardId == s.shard_id ? "outline-none ring-2 ring-primary-accent ring-offset-2" : "",
            )}
          >
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Shard {s.shard_id}</span>
                {s.is_ready ? (
                  moment(Date.now() - s.last_updated * 1000).minutes() > 5 ? (
                    <span className="text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.7)]">
                      Starting
                    </span>
                  ) : (
                    <span className="text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.7)]">
                      Ready
                    </span>
                  )
                ) : (
                  <span className="text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.7)]">
                    Closed
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                <FaArrowsRotate className="mr-1 inline" />
                {moment(s.last_updated * 1000).fromNow()}
              </CardDescription>
            </CardHeader>
            <hr className="border-secondary-accent" />
            <CardContent className="grid grid-cols-3 p-4 text-sm leading-loose">
              <span className="text-center">
                <h6 className="font-semibold">
                  <FaClock className="mr-1 inline" />
                  Uptime
                </h6>
                {moment(Date.now() + s.uptime * 1000).fromNow(true)}
              </span>
              <span className="text-center">
                <h6 className="font-semibold">
                  <FaServer className="mr-1 inline" />
                  Servers
                </h6>
                {s.server_count.toLocaleString()}
              </span>
              <span className="text-center">
                <h6 className="font-semibold">
                  <FaUsers className="mr-1 inline" />
                  Users
                </h6>
                {s.user_count.toLocaleString()}
              </span>
              <div className="col-span-3">
                <span className="text-center">
                  <h6 className="font-semibold">
                    <FaChartLine className="mr-1 inline" />
                    Latency (ms)
                  </h6>
                </span>
                <LatencyGraph latencies={s.latency} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
