import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { useGpuTier } from "@/hooks/use-gpu-tier";
import { trpc } from "@/lib/trpc";
import {
  getMiddleValues,
  useRotatingQueue,
} from "../../hooks/use-rotating-queue";
import DiscordCommunity from "./icons/discord-community";

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
  const queue = useRotatingQueue(
    guilds,
    TRANSITION_DURATION * 1500,
    POSITIONS.length,
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-x-hidden p-24">
      {children}
      {gpuTier.tier > 1 ? (
        <AnimatePresence>
          {queue.length > 0 &&
            queue.map((x, i) => {
              const pos = POSITIONS[i % POSITIONS.length];
              const endPos = POSITIONS[0];

              return (
                <motion.div
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    opacity: pos.opacity,
                    filter: `blur(${pos.blur}px)`,
                  }}
                  className="absolute -z-50"
                  exit={{
                    x: endPos.x,
                    y: endPos.y,
                    opacity: 0,
                    filter: `blur(${endPos.blur}px)`,
                  }}
                  initial={{
                    x: 0,
                    y: 200,
                    opacity: 0,
                    filter: "blur(16px)",
                  }}
                  key={`guild-${x.id}`}
                  transition={{
                    type: "spring",
                    bounce: 0.4,
                    duration: TRANSITION_DURATION,
                    ease: [0.49, 0.16, 0.25, 0.81],
                    delay: i * 0.1,
                  }}
                >
                  <div className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-primary to-primary-accent p-3">
                    <div className="absolute inset-[1.5px] rounded-full bg-linear-to-r from-background/30 to-background/60" />
                    <div className="relative z-10 flex max-w-[16rem] items-center gap-1.5">
                      <Image
                        alt={x.name}
                        className="aspect-square h-10 w-10 rounded-full"
                        draggable={false}
                        height={40}
                        loading="lazy"
                        quality={80}
                        src={x.iconUrl}
                        width={40}
                      />
                      <span className="mx-2 truncate font-mono text-primary-foreground leading-tight">
                        <DiscordCommunity className="inline-block size-5" />{" "}
                        {x.name}
                        <br />
                        <span className="text-primary-foreground/50 text-sm">
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
        guilds &&
        getMiddleValues(guilds, POSITIONS.length).values.map((x, i) => {
          const pos = POSITIONS[i % POSITIONS.length];

          return (
            <div
              className="absolute -z-50"
              key={`guild-${x.id}`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                opacity: pos.opacity,
              }}
            >
              <div className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-primary to-primary-accent p-3">
                <div className="absolute inset-[1.5px] rounded-full bg-linear-to-r from-background/30 to-background/60" />
                <div className="relative z-10 flex max-w-[16rem] items-center gap-1.5">
                  <Image
                    alt={x.name}
                    className="aspect-square h-10 w-10 rounded-full"
                    draggable={false}
                    height={40}
                    loading="lazy"
                    quality={80}
                    src={x.iconUrl}
                    width={40}
                  />
                  <span className="mx-2 truncate font-mono text-primary-foreground leading-tight">
                    <DiscordCommunity className="inline-block size-5" />{" "}
                    {x.name}
                    <br />
                    <span className="text-primary-foreground/50 text-sm">
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
