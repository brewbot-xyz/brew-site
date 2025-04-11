"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";

import { Button } from "@/app/components/button";
import Embed from "@/app/components/embed";
import Navbar from "@/app/components/navbar";
import { WavyBackground } from "@/app/components/wavy-background";
import { transition } from "@/lib/constants";
import { Material } from "@/lib/resources";
import { trpc } from "@/lib/trpc";
import { cn, parseInfo } from "@/lib/utils";
import { BsPlusLg } from "react-icons/bs";
import Loading from "./loading";
import { GrowLogo } from "./components/grow-logo";

interface Stats {
  guilds: number;
  users: number;
}

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
  [Material.STRAWBERRY]: [
    "<:strawberry:1337741721500651530>",
    RARITY_EMOJIS.uncommon,
  ],
  [Material.BANANA]: ["<:bananas:1281389517630078996>", RARITY_EMOJIS.uncommon],
  [Material.ROCK]: ["<:Rock:1281390453375369236>", RARITY_EMOJIS.common],
  [Material.GLASS]: [
    "<:glass_shard:1281389887316037673>",
    RARITY_EMOJIS.common,
  ],
  [Material.MILK]: ["<:milk:1281389599012290560>", RARITY_EMOJIS.rare],
  [Material.PLANT_FIBER]: [
    "<:plant_fiber:1337752211769528320>",
    RARITY_EMOJIS.common,
  ],
});

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    documentChangeHandler();
    mediaQueryList.addEventListener("change", documentChangeHandler);
    return () =>
      mediaQueryList.removeEventListener("change", documentChangeHandler);
  }, [query]);

  return matches;
};

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [found, setFound] = useState<string>("");
  const [scrollY, setScrollY] = useState(0);

  const shardsQuery = trpc.brew.stats.useQuery(undefined, {
    initialData: { shards: [] },
    refetchInterval: 30_000,
    select: ({ shards }) =>
      !shards.length
        ? null
        : shards.reduce(
            (acc: Stats, shard) => {
              acc.guilds += shard.server_count;
              acc.users += shard.user_count;
              return acc;
            },
            { guilds: 0, users: 0 }
          ),
  });

  const usersQuery = trpc.discord.demoUsers.useQuery(undefined, {
    initialData: [],
    refetchOnMount: "always",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateFound = () => {
      const mats = [];
      for (const [material, [matChance, amtRange]] of Object.entries(
        MATERIAL_STATS
      )) {
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
      const search = mats.slice(0, 6).join("\n");
      setFound(
        `<a:magnifying_glass:1284695990426931252> You went searching and found...\n**_Found_**\n${search}`
      );
    };
    updateFound();
    const updater = setInterval(updateFound, 1000 * 2);
    return () => clearInterval(updater);
  }, []);

  const stats = shardsQuery.data;
  const users = usersQuery.data;

  if (!stats) shardsQuery.refetch();

  if ([shardsQuery, usersQuery].some((query) => query.isLoading)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <WavyBackground
      className="relative flex min-h-screen w-full flex-col items-center antialiased"
      colors={["#000000", "#0D0605", "#1B0C0B", "#281210", "#351815"]}
      wavewidth={100}
      blur={0}
      waveOpacity={1}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
      >
        <Navbar />
      </motion.div>
      <div className="relative top-48 w-full max-w-6xl justify-center flex flex-col items-center">
        <GrowLogo />
        <motion.div
          className="text-lg relative mx-auto flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <span className="font-mono font-black italic">PROUDLY SERVING</span>
          <section className="font-mono text-center text-white/50">
            <span className="font-bold text-white">
              {stats?.users.toLocaleString()}
            </span>
            <span> users&#x2003;</span>
            <span className="font-bold text-white">
              {stats?.guilds.toLocaleString()}
            </span>
            <span> servers&#x2003;</span>
          </section>
          <div className="flex space-x-2 mt-12">
            <Link href="https://discord.com/oauth2/authorize?client_id=1076140187471593492&permissions=8&scope=applications.commands%20bot">
              <Button size="lg">
                <BsPlusLg className="size-4 mr-1" /> Add to Discord
              </Button>
            </Link>
            <Link href="https://discord.gg/brew">
              <Button variant="secondary" size="lg">
                Buy Now
              </Button>
            </Link>
          </div>
          {
            <span
              className={cn(
                `mt-4 font-mono text-sm text-white/50 transition-opacity`,
                scrollY === 0 ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="font-bold">TIP:</span> Click on Brew&apos;s
              profile!
            </span>
          }

          <div className="my-36 grid gap-24 px-4 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="mb-1.5 text-4xl font-bold">Minigame System</h1>
              <p className="font-normal text-white/70">
                Search for items, craft tools, buy weapons, and fight bosses
                while leveling up!
              </p>
            </div>
            <Embed
              className="h-[187px] place-content-center lg:place-content-end"
              user={users[0]}
              reply=",search"
              accent="secondary-accent"
            >
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-0.5">
                  {parseInfo(found)}
                </div>
                <div>
                  <Image
                    draggable={false}
                    src="https://i.ibb.co/t4bZYqH/Screenshot-2024-01-28-184334.png"
                    alt="Forest"
                    className="mb-4 hidden h-auto w-24 rounded-md lg:block"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </Embed>
            {[
              <Embed
                key={0}
                className="place-content-center lg:place-content-end"
              >
                <span className="text-xl font-semibold">
                  {parseInfo(
                    "Voicemaster Commands <:commands:1251734109298884728>",
                    24
                  )}
                </span>
                {parseInfo(
                  `
<:white_unlock:1232100904367292479> \`vc unlock\` -> Unlocks your vc to other members.
<:lock:1250250408912490516> \`vc lock\` -> Locks your vc from other members.
<:ban:1250250746717536266> \`vc ban (user)\` -> Bans a user from joining your vc.
<:white_staff:1250966358326251592> \`vc unban (user)\` -> Unbans a user from your vc.
<:permit:1250251725491671102> \`vc permit (user)\` -> Allows a user to join your vc.
<:white_mute:1251845771318394911> \`vc stfu (user)\` -> Server mutes a user in your vc.
<:white_unmute:1251846619683356814> \`vc unmute (user)\` -> Server unmute a user in your vc.
<:white_crown:1251750590447358066> \`vc transfer (user)\` -> Transfers the vc ownership to another user.
`
                )}
              </Embed>,
              <div key={1} className="text-center lg:text-right">
                <h1 className="mb-1.5 text-4xl font-bold">
                  Manage Voice Channels
                </h1>
                <p className="font-normal text-white/70">
                  Create temporary voice channels, set user limits, and manage
                  access with ease.
                </p>
              </div>,
            ].reduce((acc: JSX.Element[], el) => {
              if (isMobile) acc.unshift(el);
              else acc.push(el);
              return acc;
            }, [])}
            <div className="text-center lg:text-left">
              <h1 className="mb-1.5 text-4xl font-bold">General Moderation</h1>
              <p className="font-normal text-white/70">
                Kick, ban, mute, and warn users with ease. View user information
                and audit logs.
              </p>
            </div>
            <Embed
              className="place-content-center lg:place-content-end"
              accent="secondary-accent"
            >
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
                <span>
                  {parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}
                </span>
                <code className="p-2!">ban (member) (reason)</code>
                <span>Page 1/1 (1 page)</span>
              </div>
            </Embed>
          </div>
        </motion.div>
      </div>
    </WavyBackground>
  );
}
