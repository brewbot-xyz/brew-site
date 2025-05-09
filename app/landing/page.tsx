"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import { Material } from "@/lib/resources";
import { trpc } from "@/lib/trpc";
import Loading from "../loading";

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

const Index = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [found, setFound] = useState<string>("");
  const [scrollY, setScrollY] = useState(0);

  trpc.brew.stats.useQuery(undefined, {
    initialData: { shards: [] },
    refetchInterval: 30_000,
  });

  const shardsQuery = trpc.brew.stats.useQuery(undefined, {
    initialData: { shards: [] },
    refetchOnMount: "always",
    select: ({ shards }) =>
      !shards.length
        ? { guilds: 0, users: 0 }
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

  if ([shardsQuery, usersQuery].some((query) => query.isLoading)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brew-darker">
      <div className="fixed inset-0 -z-10 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-20"></div>
      <Navbar />

      <main>
        <HeroSection stats={stats} scrollY={scrollY} />
        <FeaturesSection users={users} found={found} isMobile={isMobile} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
