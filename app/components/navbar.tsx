"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { BsDiscord, BsFillHouseFill, BsHeartPulseFill, BsStack } from "react-icons/bs";

import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
          "fixed inset-x-0 bottom-0 z-50 mx-auto md:bottom-auto flex items-center transition-all",
          "md:max-w-full xl:max-w-full 2xl:max-w-full",
          scrolled ? "md:h-[81px]" : "md:h-[64px]",
        )}
      >
        <div className={"bottom-0 absolute w-full h-full bg-transparent"}></div>
        <div className="hidden md:flex w-full z-10 pointer-events-none">{children}</div>
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 mx-auto md:top-2.5 transition-all",
            scrolled
              ? "md:h-[62px] md:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[60%]"
              : "md:h-[50px] md:max-w-md xl:max-w-xl 2xl:max-w-3xl",
          )}
        >
          <Menu className="h-full items-center px-8 md:border-0 transition-all">
            {/* Mobile View */}
            <HoveredLink
              href="/"
              className="flex flex-col items-center align-middle text-xs md:hidden"
            >
              <BsFillHouseFill className="size-6" />
              Home
            </HoveredLink>
            <HoveredLink
              href="/commands"
              className="flex flex-col items-center align-middle text-xs md:hidden"
            >
              <DiscordAppsIcon className="size-6" />
              Commands
            </HoveredLink>
            <HoveredLink
              href="/status"
              className="flex flex-col items-center align-middle text-xs md:hidden"
            >
              <BsHeartPulseFill className="size-6" />
              Status
            </HoveredLink>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex flex-col items-center align-middle text-xs md:hidden">
                  <BsStack className="size-6" />
                  Resources
                </button>
              </DialogTrigger>
              <DialogBox showCloseButton={false}>
                <Profile />
              </DialogBox>
            </Dialog>
            {/* Desktop View */}
            <div className="w-1/3 hidden md:flex">
              <HoveredLink
                className={cn(
                  "backdrop-blur-sm backdrop-brightness-50 p-1.5 transition-all font-semibold flex items-center",
                )}
                href="/"
              >
                <Image
                  src="/brew.png"
                  alt="Brew"
                  width={36}
                  height={36}
                  className="transition-all size-9 mr-0.5 rounded-full"
                />
                <span className="p-1.5 hidden xl:inline-block">Home</span>
              </HoveredLink>
            </div>
            <div className="hidden items-center font-semibold justify-center space-x-4 md:flex md:space-x-8">
              <HoveredLink className="backdrop-blur-sm backdrop-brightness-50 p-3" href="/commands">
                Commands
              </HoveredLink>
              <HoveredLink className="backdrop-blur-sm backdrop-brightness-50 p-3" href="/status">
                Status
              </HoveredLink>
              <HoveredLink
                className="backdrop-blur-sm backdrop-brightness-50 p-3"
                href="https://docs.brewbot.xyz"
              >
                Docs
              </HoveredLink>
            </div>
            <div
              className="hidden w-1/3 items-center justify-end md:flex"
              aria-label="Join our Discord server"
            >
              <Link href="https://discord.gg/brew">
                <Button variant="blue" rounded="xl" size="icon">
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
