"use client";

import Navbar from "@/components/navbar";
import { trpc } from "@/lib/trpc";
import Link from "next/link";
import Image from "next/image";
import { BsQuestionCircleFill } from "react-icons/bs";
import { Card } from "@/components/ui/card";

export default function GuildSelect() {
  const { data: guilds, isLoading, isError, error } = trpc.discord.protectedGuilds.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading guilds: {error.message}</div>;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center antialiased">
      <Navbar>
        <div className="my-4 flex h-[52px] w-full justify-between px-4 md:my-10 md:px-10">
          <div className="flex items-center text-3xl font-bold">
            <BsQuestionCircleFill className="mr-2" />
            <span className="flex md:hidden xl:flex">Select a Server</span>
          </div>
        </div>
      </Navbar>
      <div className="mb-16 flex md:pt-32 max-w-4xl flex-col gap-3 bg-background p-4">
        <div className="flex items-center text-3xl font-bold mb-6">
          <span className="flex md:hidden">Select a Server</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guilds?.map((guild) => (
            <Link key={guild.id} href={`/dashboard/${guild.id}`}>
              <Card className="p-4 hover:bg-background/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Image
                    src={guild.iconUrl}
                    alt={guild.name}
                    className="rounded-full"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="font-semibold truncate">{guild.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {guild.memberCount.toLocaleString()} members
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
