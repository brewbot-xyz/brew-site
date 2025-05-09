"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

import Embed from "@/app/components/embed";
import Navbar from "@/app/components/navbar";
import { WavyBackground } from "@/app/components/wavy-background";
import { transition } from "@/lib/constants";
import { Material } from "@/lib/resources";
import { trpc } from "@/lib/trpc";
import { parseEmoji, parseInfo } from "@/lib/utils";
import {
  BsChevronDown,
  BsHash,
  BsListTask,
  BsMusicNoteList,
  BsShieldLockFill,
} from "react-icons/bs";
import { FaGamepad, FaVolumeHigh } from "react-icons/fa6";
import { Button } from "./components/button";
import { Card } from "./components/card";
import NowPlaying from "./components/demo/now-playing";
import HeroSection from "./components/hero-section";

const RARITY_EMOJIS = {
  common: "<:common:1070806606666809434>",
  uncommon: "<:uncommon:1070815953400639609>",
  rare: "<:rare:1070816682840440892>",
  legendary: "<:legendary:1071879242708693063>",
  titan: "<:titan:1073940280291639346>",
  exotic: "<:exotic:1075657086307942401>",
} as const satisfies Record<string, string>;

const MATERIAL_STATS = {
  [Material.WHEAT]: [100, [1, 5]],
  [Material.WOOD]: [40, [1, 3]],
  [Material.APPLE]: [35, [1, 2]],
  [Material.GRAPES]: [30, [1, 3]],
  [Material.STRAWBERRY]: [25, [1, 2]],
  [Material.BANANA]: [24, [1, 4]],
  [Material.ROCK]: [23, [1, 2]],
  [Material.GLASS]: [4, [1, 3]],
  [Material.MILK]: [1, [1, 1]],
  [Material.PLANT_FIBER]: [50, [1, 3]],
} satisfies Record<Material, [number, [number, number]]>;

const MATERIAL_EMOJIS = Object.freeze({
  [Material.WHEAT]: ["<:Wheat:1337581167817396285>", RARITY_EMOJIS.common],
  [Material.WOOD]: ["<:Wood:1336602522818838639>", RARITY_EMOJIS.common],
  [Material.APPLE]: ["<:Apple:1281389750321938452>", RARITY_EMOJIS.uncommon],
  [Material.GRAPES]: ["<:grapes:1337741465287131226>", RARITY_EMOJIS.uncommon],
  [Material.STRAWBERRY]: ["<:strawberry:1337741721500651530>", RARITY_EMOJIS.uncommon],
  [Material.BANANA]: ["<:bananas:1281389517630078996>", RARITY_EMOJIS.uncommon],
  [Material.ROCK]: ["<:Rock:1281390453375369236>", RARITY_EMOJIS.common],
  [Material.GLASS]: ["<:glass_shard:1281389887316037673>", RARITY_EMOJIS.common],
  [Material.MILK]: ["<:milk:1281389599012290560>", RARITY_EMOJIS.rare],
  [Material.PLANT_FIBER]: ["<:plant_fiber:1337752211769528320>", RARITY_EMOJIS.common],
});

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    documentChangeHandler();
    mediaQueryList.addEventListener("change", documentChangeHandler);
    return () => mediaQueryList.removeEventListener("change", documentChangeHandler);
  }, [query]);

  return matches;
};

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const { data: users } = trpc.discord.demoUsers.useQuery(undefined, {
    initialData: [],
    refetchOnMount: "always",
  });

  useEffect(() => {
    const updateFound = () => {
      const mats = [];
      for (const [material, [matChance, amtRange]] of Object.entries(MATERIAL_STATS)) {
        const [matEmoji, rarityEmoji] = MATERIAL_EMOJIS[material as Material];
        if (Math.random() * 100 <= matChance) {
          const matAmount = Math.floor(
            Math.random() * (amtRange[1] - amtRange[0] + 1) + amtRange[0]
          );
          mats.push(
            `<a:arrow:1308808585379315732> **x${matAmount}** ${material} ${matEmoji} ${rarityEmoji}`
          );
        }
      }
      // const search = mats.slice(0, 6).join("\n");
      // setFound(
      //   `<a:magnifying_glass:1284695990426931252> You went searching and found...\n**_Found_**\n${search}`
      // );
    };
    updateFound();
    const updater = setInterval(updateFound, 1000 * 2);
    return () => clearInterval(updater);
  }, []);

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
      <div className="relative w-full max-w-6xl justify-center flex flex-col items-center">
        <div className="mb-36 grid gap-24 px-4 lg:grid-cols-2">
          {/* <div className="text-center lg:text-left">
            <h1 className="mb-1.5 text-4xl font-bold">Minigame System</h1>
            <p className="font-normal text-white/70">
              Search for items, craft tools, buy weapons, and fight bosses while leveling up!
            </p>
          </div>
          <Embed
            className="h-[187px] place-content-center lg:place-content-end"
            user={users[0]}
            reply=",search"
            accent="secondary-accent"
          >
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-0.5">{parseInfo(found)}</div>
            </div>
          </Embed> */}

          <section className="col-span-2 text-center relative">
            <span className="text-4xl font-bold">
              Wide Variety of{" "}
              <Card className="inline-flex items-center gap-3 rounded-full text-primary-foreground text-4xl p-3">
                Features <BsListTask />
              </Card>
            </span>
            <p className="mt-3 font-normal text-white/70">
              Brew offers a comprehensive set of features to enhance your Discord community.
              <br />
              From moderation tools to fun minigames, we&apos;ve got you covered!
            </p>
          </section>
          <Card className="p-0">
            <Image
              src="/antinuke.webp"
              alt="Antinuke Demo"
              width={1080}
              height={1080}
              className="mx-auto rounded-3xl"
              quality={100}
              draggable={false}
            />
            <div className="mt-4 p-6 text-center">
              <h1 className="inline-flex items-center gap-3 text-2xl font-semibold text-primary-foreground">
                Antinuke Protection <BsShieldLockFill />
              </h1>
              <p className="text-sm text-white/70">
                Protect your server from unauthorized changes with our advanced antinuke system.
              </p>
            </div>
          </Card>
          <Card className="p-0">
            <div className="mt-4 p-6 text-center">
              <h1 className="inline-flex items-center gap-3 text-2xl font-semibold text-primary-foreground">
                Minigames <FaGamepad />
              </h1>
              <p className="text-sm text-white/70">
                Engage your community with fun minigames like searching for items, crafting tools,
                and battling bosses while leveling up!
              </p>
            </div>
            <Image
              src="/minigame.webp"
              alt="Minigames Demo"
              width={1080}
              height={1080}
              className="mx-auto rounded-3xl"
              quality={100}
              draggable={false}
            />
          </Card>

          <section className="col-span-2 text-center relative">
            <span className="text-4xl font-bold">
              First-rate{" "}
              <Card className="inline-flex items-center gap-3 rounded-full text-primary-foreground text-4xl p-3">
                Voice Management <BsMusicNoteList />
              </Card>
            </span>
            <p className="mt-3 font-normal text-white/70">
              Create, manage, and customize voice channels with ease.
              <br />
              Incorporate our music features for a seamless experience.
            </p>
          </section>

          {[
            <div key={0} className="flex flex-col items-center justify-between">
              <Embed user={users[0]} reply=",voicemaster setup">
                <section>
                  Please take note that this will create at most{" "}
                  <span className="font-bold">3</span> categories and{" "}
                  <span className="font-bold">4</span> channels. If you have any antinuke enabled,
                  make sure that it will not affect this process.
                </section>
              </Embed>
              <section className="flex w-full space-x-2 pt-2 pb-4">
                <Button variant="success">Approve</Button>
                <Button variant="danger">Decline</Button>
              </section>
              <Card className="place-content-center lg:place-content-end">
                <h1 className="text-xl font-semibold text-primary-foreground">
                  Voicemaster Commands {parseEmoji("<:brew_commands:1362398411135123456>", 24)}
                </h1>
                <section className="mt-2 text-primary-foreground/75 leading-relaxed">
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
`
                  )}
                </section>
              </Card>
            </div>,
            <div key={14} className="flex flex-col items-center justify-between">
              <Card>
                <h1 className="text-xl font-semibold text-primary-foreground">
                  Manage Voice Channels
                </h1>
                <p className="text-sm font-normal text-white/75 leading-relaxed">
                  Create temporary voice channels, set user limits, and manage access with ease.
                </p>
                <div className="mt-8 flex justify-between">
                  <section>
                    <span className="inline-flex items-center gap-2">
                      Voice Channels <BsChevronDown className="inline-block size-3" />
                    </span>
                    <div className="mt-2 flex flex-col space-y-2">
                      <span className="inline-flex items-center gap-2">
                        <BsHash className="size-6" /> guide
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FaVolumeHigh className="size-5" /> public
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FaVolumeHigh className="size-5" /> private
                      </span>
                    </div>
                  </section>
                  <section>
                    <span className="inline-flex items-center gap-2">
                      Public Channels <BsChevronDown className="inline-block size-3" />
                    </span>
                    <div className="mt-2 flex flex-col space-y-2 text-primary-foreground">
                      <span className="inline-flex items-center gap-2">
                        <FaVolumeHigh className="size-5" /> {users[0]?.name || "public"}&apos;s
                        channel
                      </span>
                      {users.map((user) => (
                        <span key={user.name} className="ml-4 inline-flex items-center gap-2">
                          <Image
                            draggable={false}
                            aria-label="User Avatar"
                            src={user.avatarUrl}
                            alt="User Avatar"
                            className="inline-block size-5 rounded-full"
                            width={40}
                            height={40}
                          />
                          <span>{user.name}</span>
                        </span>
                      ))}
                    </div>
                  </section>
                  <section>
                    <span className="inline-flex items-center gap-2">
                      Private Channels <BsChevronDown className="inline-block size-3" />
                    </span>
                    <div className="mt-2 flex flex-col space-y-2">
                      <span className="inline-flex items-center gap-2">
                        <FaVolumeHigh className="size-5" /> secret disco
                      </span>
                      <span className="ml-4 truncate text-xs">
                        {parseEmoji("<a:music_notes:1362211992332533942>", 12)} Pyramids by Frank...
                      </span>
                      <span className="ml-4 inline-flex items-center gap-2">
                        <Image
                          draggable={false}
                          aria-label="Bot Avatar"
                          src="/brew.png"
                          alt="Bot Avatar"
                          className="inline-block size-5 rounded-full outline-2 outline-green-500/50"
                          width={40}
                          height={40}
                        />
                        <span>Brew</span>
                      </span>
                    </div>
                  </section>
                </div>
              </Card>
              <NowPlaying />
            </div>,
          ].reduce((acc: JSX.Element[], el) => {
            if (isMobile) acc.unshift(el);
            else acc.push(el);
            return acc;
          }, [])}
          <div className="text-center lg:text-left">
            <h1 className="mb-1.5 text-4xl font-bold">General Moderation</h1>
            <p className="font-normal text-white/70">
              Kick, ban, mute, and warn users with ease. View user information and audit logs.
            </p>
          </div>
          <Embed className="place-content-center lg:place-content-end">
            {users[1] && (
              <span className="items-center font-semibold">
                <Image
                  draggable={false}
                  aria-label="User Avatar"
                  src={users[1].avatarUrl}
                  alt="User Avatar"
                  className="mr-2 inline-block size-7 rounded-full"
                  width={160}
                  height={160}
                />
                <span className="font-medium">{users[1].name}</span>
              </span>
            )}
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-lg font-semibold">Command: ban</h3>
              <span>Bans a member from the guild.</span>
              <span>{parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}</span>
              <code className="p-2!">ban (member) (reason)</code>
              <span>Page 1/1 (1 page)</span>
            </div>
          </Embed>
        </div>
      </div>
    </WavyBackground>
  );
}
