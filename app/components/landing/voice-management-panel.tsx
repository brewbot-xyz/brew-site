import Image from "next/image";
import { BsChevronDown, BsHash } from "react-icons/bs";
import { FaVolumeHigh } from "react-icons/fa6";
import type { DemoUser } from "@/lib/resources";
import { parseEmoji } from "@/lib/utils";
import { Card, CardContent } from "../card";
import NowPlaying from "./music-demo-section";

export function VoiceManagementPanel(props: { users: DemoUser[] }) {
  const userA = props.users.at(0);
  const publicName = userA?.name ?? "public";

  return (
    <div className="flex max-w-lg flex-col items-center justify-between place-self-center">
      <Card className="w-full">
        <CardContent className="p-3 sm:p-6">
          <h3 className="mb-2 font-semibold text-lg text-primary-foreground sm:text-xl">
            Manage Voice Channels
          </h3>
          <p className="mb-4 font-normal text-primary-foreground/75 text-xs leading-relaxed sm:text-sm">
            Create temporary voice channels, set user limits, and manage access
            with ease.
          </p>

          <div className="flex justify-between gap-4 lg:gap-6">
            <section className="flex-1">
              <span className="inline-flex items-center gap-2 font-medium text-sm">
                Voice Channels <BsChevronDown className="inline-block size-3" />
              </span>
              <div className="mt-2 flex flex-col space-y-1.5">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <BsHash className="size-4 shrink-0 sm:size-5" /> guide
                </span>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <FaVolumeHigh className="size-4 shrink-0 sm:size-5" /> public
                </span>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <FaVolumeHigh className="size-4 shrink-0 sm:size-5" /> private
                </span>
              </div>
            </section>

            <section className="flex-1">
              <span className="inline-flex items-center gap-2 font-medium text-sm">
                Public Channels{" "}
                <BsChevronDown className="inline-block size-3" />
              </span>

              <div className="mt-2 flex flex-col space-y-1.5 text-white">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <FaVolumeHigh className="size-4 shrink-0 sm:size-5" />
                  <span className="truncate">{publicName}&apos;s channel</span>
                </span>

                {props.users.slice(0, 2).map((user) => (
                  <span
                    className="ml-4 inline-flex items-center gap-2 text-xs sm:text-sm"
                    key={`user-${user.id}`}
                  >
                    <Image
                      alt={`${user.name}'s avatar`}
                      className="inline-block size-4 shrink-0 rounded-full sm:size-5"
                      draggable={false}
                      height={40}
                      sizes="40px"
                      src={user.avatarUrl}
                      width={40}
                    />
                    <span className="truncate">{user.name}</span>
                  </span>
                ))}
              </div>
            </section>

            <section className="flex-1">
              <span className="inline-flex items-center gap-2 font-medium text-sm">
                Private Channels{" "}
                <BsChevronDown className="inline-block size-3" />
              </span>

              <div className="mt-2 flex flex-col space-y-1.5">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <FaVolumeHigh className="size-4 shrink-0 sm:size-5" />
                  <span className="truncate">secret disco</span>
                </span>

                <span className="ml-4 truncate text-xs">
                  {parseEmoji("<a:music_notes:1362211992332533942>", 12)}{" "}
                  Pyramids by Frank...
                </span>

                <span className="ml-4 inline-flex items-center gap-2 text-xs sm:text-sm">
                  <Image
                    alt="Brew bot avatar"
                    className="inline-block size-4 shrink-0 rounded-full outline-2 outline-green-500/50 sm:size-5"
                    draggable={false}
                    height={40}
                    sizes="40px"
                    src="/assets/brew.png"
                    width={40}
                  />
                  <span>Brew</span>
                </span>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      <NowPlaying />
    </div>
  );
}
