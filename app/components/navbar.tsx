"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  BsDiscord,
  BsFillHouseFill,
  BsHeartPulseFill,
  BsStack,
} from "react-icons/bs";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { DialogBox } from "./dialog";
import DiscordAppsIcon from "./icons/discord-apps";
import { HoveredLink, Menu } from "./menu";
import Profile from "./profile";

function Navbar({ children }: { children?: React.ReactNode }) {
  const scrolled = useScrolled();

  return (
    <div>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-full items-center transition-all md:bottom-auto",
          scrolled ? "md:h-20.25" : "md:h-16",
        )}
      >
        <div className={"absolute bottom-0 h-full w-full bg-transparent"} />
        <div className="pointer-events-none z-10 hidden w-full md:flex">
          {children}
        </div>
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 mx-auto transition-all md:top-2.5",
            scrolled
              ? "md:h-15.5 md:max-w-[60%]"
              : "md:h-12.5 md:max-w-lg xl:max-w-xl 2xl:max-w-2xl",
          )}
        >
          <Menu className="h-full items-center px-8 transition-all md:border-0">
            {/* Mobile View */}
            <HoveredLink
              className="flex flex-col items-center align-middle text-xs md:hidden"
              href="/"
            >
              <BsFillHouseFill className="size-6" />
              Home
            </HoveredLink>
            <HoveredLink
              className="flex flex-col items-center align-middle text-xs md:hidden"
              href="/commands"
            >
              <DiscordAppsIcon className="size-6" />
              Commands
            </HoveredLink>
            <HoveredLink
              className="flex flex-col items-center align-middle text-xs md:hidden"
              href="/status"
            >
              <BsHeartPulseFill className="size-6" />
              Status
            </HoveredLink>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="flex flex-col items-center align-middle text-xs md:hidden"
                  type="button"
                >
                  <BsStack className="size-6" />
                  Resources
                </button>
              </DialogTrigger>
              <DialogBox showCloseButton={false}>
                <Profile />
              </DialogBox>
            </Dialog>
            {/* Desktop View */}
            <div className="hidden w-1/3 md:flex">
              <HoveredLink
                className={cn(
                  "flex items-center p-1.5 font-semibold backdrop-blur-sm backdrop-brightness-50 transition-all",
                )}
                href="/"
              >
                <Image
                  alt="Brew"
                  className="mr-0.5 aspect-square size-9 rounded-full transition-all"
                  height={36}
                  src="/assets/brew.png"
                  width={36}
                />
                <span className="hidden p-1.5 xl:inline-block">Home</span>
              </HoveredLink>
            </div>
            <div className="hidden items-center justify-center space-x-4 font-semibold md:flex md:space-x-8">
              <HoveredLink
                className="p-3 backdrop-blur-sm backdrop-brightness-50"
                href="/commands"
              >
                Commands
              </HoveredLink>
              <HoveredLink
                className="p-3 backdrop-blur-sm backdrop-brightness-50"
                href="/status"
              >
                Status
              </HoveredLink>
              <HoveredLink
                className="p-3 backdrop-blur-sm backdrop-brightness-50"
                href="https://docs.brewbot.xyz"
              >
                Docs
              </HoveredLink>
            </div>
            <div className="hidden w-1/3 items-center justify-end md:flex">
              <Link href="https://discord.gg/brew">
                <Button rounded="xl" size="icon" variant="blue">
                  <BsDiscord className="size-6" />
                </Button>
              </Link>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Navbar);
