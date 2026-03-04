import { trpc } from "@/lib/trpc";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { getMiddleValues, useRotatingQueue } from "../hooks/use-rotating-queue";
import DiscordCommunity from "./icons/discord-community";
import { useGpuTier } from "@/hooks/use-gpu-tier";

const TRANSITION_DURATION = 3.5;

const POSITIONS = [
  { x: -640, y: 200, opacity: 0, blur: 16 },
  { x: -400, y: 0, opacity: 1, blur: 0 },
  { x: -320, y: -160, opacity: 1, blur: 0 },
  { x: 0, y: -240, opacity: 1, blur: 0 },
  { x: 320, y: -160, opacity: 1, blur: 0 },
  { x: 400, y: 0, opacity: 1, blur: 0 },
  { x: 640, y: 240, opacity: 0, blur: 16 },
];

function CardTrack({ children }: { children?: React.ReactNode }) {
  const gpuTier = useGpuTier();
  const { data: guilds } = trpc.discord.publicGuilds.useQuery();
  const queue = useRotatingQueue(guilds, TRANSITION_DURATION * 1500, POSITIONS.length);

  return (
    <div className="relative flex flex-col items-center justify-center w-full p-24 overflow-x-hidden">
      {children}
      {gpuTier.tier > 1 ? (
        <AnimatePresence>
          {queue.length > 0 &&
            queue.map((x, i) => {
              const pos = POSITIONS[i % POSITIONS.length];
              const endPos = POSITIONS[0];

              return (
                <motion.div
                  key={`guild-${x.id}`}
                  initial={{
                    x: 0,
                    y: 200,
                    opacity: 0,
                    filter: "blur(16px)",
                  }}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    opacity: pos.opacity,
                    filter: `blur(${pos.blur}px)`,
                  }}
                  exit={{
                    x: endPos.x,
                    y: endPos.y,
                    opacity: 0,
                    filter: `blur(${endPos.blur}px)`,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.4,
                    duration: TRANSITION_DURATION,
                    ease: [0.49, 0.16, 0.25, 0.81],
                    delay: i * 0.1,
                  }}
                  className="absolute -z-50"
                >
                  <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-primary to-primary-accent rounded-full">
                    <div className="absolute inset-[1.5px] bg-gradient-to-r from-background/30 to-background/60 rounded-full"></div>
                    <div className="relative z-10 flex items-center gap-1.5 max-w-[16rem]">
                      <Image
                        src={x.iconUrl}
                        alt={x.name}
                        className="w-10 h-10 rounded-full aspect-square"
                        width={40}
                        height={40}
                        draggable={false}
                        loading="lazy"
                        quality={100}
                      />
                      <span className="mx-2 text-primary-foreground font-mono truncate leading-tight">
                        <DiscordCommunity className="inline-block size-5" /> {x.name}
                        <br />
                        <span className="text-sm text-primary-foreground/50">
                          <BsCircleFill className="inline-block size-2" />{" "}
                          {x.memberCount.toLocaleString()} Members
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      ) : (
        guilds && getMiddleValues(guilds, POSITIONS.length).values.map((x, i) => {
          
          const pos = POSITIONS[i % POSITIONS.length];

          return (
            <div
              key={`guild-${x.id}`}
              className="absolute -z-50"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                opacity: pos.opacity,
              }}
            >
              <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-primary to-primary-accent rounded-full">
                <div className="absolute inset-[1.5px] bg-gradient-to-r from-background/30 to-background/60 rounded-full"></div>
                <div className="relative z-10 flex items-center gap-1.5 max-w-[16rem]">
                  <Image
                    src={x.iconUrl}
                    alt={x.name}
                    className="w-10 h-10 rounded-full aspect-square"
                    width={40}
                    height={40}
                    draggable={false}
                    loading="lazy"
                    quality={100}
                  />
                  <span className="mx-2 text-primary-foreground font-mono truncate leading-tight">
                    <DiscordCommunity className="inline-block size-5" /> {x.name}
                    <br />
                    <span className="text-sm text-primary-foreground/50">
                      <BsCircleFill className="inline-block size-2" />{" "}
                      {x.memberCount.toLocaleString()} Members
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default React.memo(CardTrack);
