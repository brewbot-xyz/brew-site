"use client";

import { motion } from "motion/react";
import Image from "next/image";

import Embed from "@/app/components/embed";
import Navbar from "@/app/components/navbar";
import { WavyBackground } from "@/app/components/wavy-background";
import { transition } from "@/lib/constants";
import { trpc } from "@/lib/trpc";
import { parseEmoji, parseInfo } from "@/lib/utils";
import {
  BsChevronDown,
  BsHash,
  BsListTask,
  BsMusicNoteList,
  BsShieldLockFill,
  BsTools,
} from "react-icons/bs";
import { FaGamepad, FaVolumeHigh } from "react-icons/fa6";
import { Button } from "./components/button";
import { Card, CardContent } from "./components/card";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroSection from "./components/hero-section";
import { JSX } from "react";
import NowPlaying from "./components/demo/now-playing";

export default function Home() {
  const isMobile = useIsMobile();

  const { data: users } = trpc.discord.demoUsers.useQuery(undefined, {
    initialData: [],
    refetchOnMount: "always",
  });

  return (
    <WavyBackground
      className="relative flex min-h-screen w-full flex-col items-center antialiased"
      colors={["#090C05", "#161007", "#231508", "#30190A", "#3d1d0b"]}
      wavewidth={100}
      blur={0}
      waveOpacity={1}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>
        <Navbar />
      </motion.div>
      <HeroSection />
      <div className="relative w-full justify-center flex flex-col items-center px-6 m:px-24">
        <div className="mb-24 sm:mb-24 lg:mb-36 grid gap-24 grid-cols-1 lg:grid-cols-2">
          <section className="lg:col-span-2 text-center relative px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              <span className="block sm:inline">{!isMobile && "Wide Variety of "}</span>
              <span className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-primary to-primary-accent px-3 sm:px-4 py-1.5 sm:py-2 mt-2 sm:mt-0">
                <span>Features</span>
                <BsListTask />
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 font-normal text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Brew offers a comprehensive set of features to enhance your Discord community.
              <span className="block sm:inline">
                <span className="hidden sm:inline">
                  <br />
                </span>
                From moderation tools to fun minigames, we&apos;ve got you covered!
              </span>
            </p>
          </section>

          <Card className="max-w-md place-self-center lg:place-self-end">
            <Image
              src="/assets/antinuke.webp"
              alt="Antinuke Demo"
              width={1080}
              height={1080}
              className="w-full h-auto rounded-t-2xl"
              quality={100}
              draggable={false}
            />
            <div className="p-3 sm:p-6 text-center">
              <h1 className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-semibold text-primary-foreground mb-2">
                <span>Antinuke Protection</span>
                <BsShieldLockFill className="text-base sm:text-lg" />
              </h1>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Protect your server from unauthorized changes with our advanced antinuke system.
              </p>
            </div>
          </Card>
          <Card className="max-w-md place-self-center lg:place-self-start">
            <div className="p-4 sm:p-6 text-center">
              <h1 className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-semibold text-primary-foreground mb-2">
                <span>Minigames</span>
                <FaGamepad className="text-base sm:text-lg" />
              </h1>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Engage your community with fun minigames like searching for items, crafting tools,
                and battling bosses while leveling up!
              </p>
            </div>
            <Image
              src="/assets/brew-minigames.png"
              alt="Minigames Demo"
              width={1080}
              height={1080}
              className="w-full h-auto rounded-b-2xl p-3"
              quality={100}
              draggable={false}
            />
          </Card>

          <section className="lg:col-span-2 text-center relative px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              <span className="block sm:inline">{!isMobile && "First-rate "}</span>
              <span className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-primary to-primary-accent px-3 sm:px-4 py-1.5 sm:py-2 mt-2 sm:mt-0">
                <span>Voice Management</span>
                <BsMusicNoteList />
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 font-normal text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Create, manage, and customize voice channels with ease.
              <span className="block sm:inline">
                <span className="hidden sm:inline">
                  <br />
                </span>
                Incorporate our music features for a seamless experience.
              </span>
            </p>
          </section>

          {[
            <div
              key="voice-setup"
              className="flex flex-col items-center justify-between max-w-lg place-self-center"
            >
              <Embed user={users[0]} reply=",voicemaster setup">
                <section className="text-xs sm:text-sm leading-relaxed">
                  Please take note that this will create at most{" "}
                  <span className="font-bold">3</span> categories and{" "}
                  <span className="font-bold">4</span> channels. If you have any antinuke enabled,
                  make sure that it will not affect this process.
                </section>
              </Embed>
              <section className="flex w-full space-x-2 pt-2 pb-4">
                <Button
                  variant="success"
                  className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                >
                  Approve
                </Button>
                <Button variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                  Decline
                </Button>
              </section>
              <Card className="w-full">
                <CardContent className="p-3 sm:p-6">
                  <h1 className="text-lg sm:text-xl font-semibold text-primary-foreground flex items-center gap-2 flex-wrap">
                    <span>Voicemaster Commands</span>
                    <span className="hidden sm:inline">
                      {parseEmoji("<:brew_commands:1362398411135123456>", 24)}
                    </span>
                  </h1>
                  <section className="mt-2 space-y-0.5 text-primary-foreground/75 text-xs sm:text-sm">
                    {parseInfo(
                      `
<:white_unlock:1232100904367292479> \`vc unlock\` Unlocks your vc to other members.
<:lock:1250250408912490516> \`vc lock\` Locks your vc from other members.
<:ban:1250250746717536266> \`vc ban (user)\` Bans a user from joining your vc.
<:white_staff:1250966358326251592> \`vc unban (user)\` Unbans a user from your vc.
<:permit:1250251725491671102> \`vc permit (user)\` Allows a user to join your vc.
<:white_mute:1251845771318394911> \`vc stfu (user)\` Server mutes a user in your vc.
<:white_unmute:1251846619683356814> \`vc unmute (user)\` Server unmute a user in your vc.
<:white_crown:1251750590447358066> \`vc transfer (user)\` Transfers vc ownership to another user.
`,
                    )}
                  </section>
                </CardContent>
              </Card>
            </div>,
            <div
              key="voice-management"
              className="flex flex-col items-center justify-between max-w-lg place-self-center"
            >
              <Card className="w-full">
                <CardContent className="p-3 sm:p-6">
                  <h1 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-2">
                    Manage Voice Channels
                  </h1>
                  <p className="text-xs sm:text-sm font-normal text-primary-foreground/75 leading-relaxed mb-4">
                    Create temporary voice channels, set user limits, and manage access with ease.
                  </p>
                  <div className="flex justify-between gap-4 lg:gap-6">
                    <section className="flex-1">
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        Voice Channels <BsChevronDown className="inline-block size-3" />
                      </span>
                      <div className="mt-2 flex flex-col space-y-1.5">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                          <BsHash className="size-4 sm:size-5 flex-shrink-0" /> guide
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                          <FaVolumeHigh className="size-4 sm:size-5 flex-shrink-0" /> public
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                          <FaVolumeHigh className="size-4 sm:size-5 flex-shrink-0" /> private
                        </span>
                      </div>
                    </section>
                    <section className="flex-1">
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        Public Channels <BsChevronDown className="inline-block size-3" />
                      </span>
                      <div className="mt-2 flex flex-col space-y-1.5 text-primary-foreground">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                          <FaVolumeHigh className="size-4 sm:size-5 flex-shrink-0" />
                          <span className="truncate">
                            {users[0]?.name || "public"}&apos;s channel
                          </span>
                        </span>
                        {users.slice(0, 2).map((user) => (
                          <span
                            key={user.name}
                            className="ml-4 inline-flex items-center gap-2 text-xs sm:text-sm"
                          >
                            <Image
                              draggable={false}
                              aria-label="User Avatar"
                              src={user.avatarUrl}
                              alt="User Avatar"
                              className="inline-block size-4 sm:size-5 rounded-full flex-shrink-0"
                              width={40}
                              height={40}
                            />
                            <span className="truncate">{user.name}</span>
                          </span>
                        ))}
                      </div>
                    </section>
                    <section className="flex-1">
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        Private Channels <BsChevronDown className="inline-block size-3" />
                      </span>
                      <div className="mt-2 flex flex-col space-y-1.5">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                          <FaVolumeHigh className="size-4 sm:size-5 flex-shrink-0" />
                          <span className="truncate">secret disco</span>
                        </span>
                        <span className="ml-4 truncate text-xs">
                          {parseEmoji("<a:music_notes:1362211992332533942>", 12)} Pyramids by
                          Frank...
                        </span>
                        <span className="ml-4 inline-flex items-center gap-2 text-xs sm:text-sm">
                          <Image
                            draggable={false}
                            aria-label="Bot Avatar"
                            src="/assets/brew.png"
                            alt="Bot Avatar"
                            className="inline-block size-4 sm:size-5 rounded-full outline-2 outline-green-500/50 flex-shrink-0"
                            width={40}
                            height={40}
                          />
                          <span>Brew</span>
                        </span>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
              <NowPlaying />
            </div>,
          ].reduce((acc: JSX.Element[], el) => {
            if (isMobile) acc.unshift(el);
            else acc.push(el);
            return acc;
          }, [])}

          <section className="col-span-1 lg:col-span-2 text-center relative px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              <span className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-primary to-primary-accent px-3 sm:px-4 py-1.5 sm:py-2">
                <span>General Moderation</span>
                <BsTools />
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 font-normal text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Kick, ban, mute, and warn users with ease. View user information and audit logs.
            </p>
          </section>

          <Embed className="max-w-md place-self-center lg:place-self-end">
            {users[1] && (
              <span className="flex items-center font-semibold mb-3">
                <Image
                  draggable={false}
                  aria-label="User Avatar"
                  src={users[1].avatarUrl}
                  alt="User Avatar"
                  className="mr-2 inline-block size-6 sm:size-7 rounded-full flex-shrink-0"
                  width={160}
                  height={160}
                />
                <span className="font-medium text-sm sm:text-base">{users[1].name}</span>
              </span>
            )}
            <div className="flex flex-col text-base space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold">Command: ban</h3>
              <span className="text-white/80">Bans a member from the guild.</span>
              <span>{parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}</span>
              <code className="p-3 bg-black/20 rounded">ban (member) (reason)</code>
              <span className="text-xs text-white/60">Page 1/1 (1 page)</span>
            </div>
          </Embed>
          <Embed className="max-w-md place-self-center lg:place-self-start">
            {users[0] && (
              <span className="flex items-center font-semibold mb-3">
                <Image
                  draggable={false}
                  aria-label="User Avatar"
                  src={users[0].avatarUrl}
                  alt="User Avatar"
                  className="mr-2 inline-block size-6 sm:size-7 rounded-full flex-shrink-0"
                  width={160}
                  height={160}
                />
                <span className="font-medium">{users[0].name}</span>
              </span>
            )}
            <div className="flex flex-col text-base space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold">Command: mute</h3>
              <span className="= text-white/80">Mutes a member in the guild.</span>
              <span>{parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}</span>
              <code className="p-4  bg-black/20 rounded">mute (member) (reason)</code>
              <span className="text-xs text-white/60">Page 1/1 (1 page)</span>
            </div>
          </Embed>
        </div>
      </div>
    </WavyBackground>
  );
}
