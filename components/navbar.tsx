"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  BsBoxArrowUpRight,
  BsDiscord,
  BsFillHouseFill,
  BsGrid1X2Fill,
  BsHeartPulseFill,
  BsStack,
} from "react-icons/bs";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useScrolled } from "@/hooks/use-scrolled";
import { absoluteUrl, cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton, useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import DiscordAppsIcon from "./icons/discord-apps";
import { Button } from "./ui/button";
import { DialogBox } from "./ui/dialog";
import { HoveredLink, Menu } from "./ui/menu";
import Profile from "./ui/profile";
import { Separator } from "./ui/separator";

function Navbar({
  children,
  isSpread = false,
}: {
  children?: React.ReactNode;
  isSpread?: boolean;
}) {
  const scrolled = useScrolled();
  const { signIn } = useSignIn();

  const handleSignIn = useCallback(() => {
    if (window !== undefined && signIn) {
      const popup = window.open("about:blank", "Sign In", "width=800,height=777");
      signIn
        .authenticateWithPopup({
          strategy: "oauth_discord",
          redirectUrl: absoluteUrl("/sign-in/sso-callback"),
          redirectUrlComplete: "/",
          popup,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [signIn]);

  return (
    <div>
      <div
        className={cn(
          "max-w-full fixed inset-x-0 bottom-0 z-50 mx-auto md:bottom-auto flex items-center transition-all md:h-[81px]",
        )}
      >
        <div className={"bottom-0 absolute w-full h-full bg-transparent"}></div>
        <div className="hidden md:flex w-full z-10 pointer-events-none">{children}</div>
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 mx-auto md:top-2.5 transition-all md:h-[64px]",
            isSpread || scrolled
              ? "md:max-w-[60%]"
              : "md:max-w-lg xl:max-w-2xl 2xl:max-w-3xl",
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
                  src="/assets/brew.png"
                  alt="Brew"
                  width={36}
                  height={36}
                  className="aspect-square transition-all size-9 mr-0.5 rounded-full"
                />
                <span className="p-1.5 hidden xl:inline-block">Home</span>
              </HoveredLink>
            </div>
            <div className="hidden items-center font-semibold justify-center space-x-4 md:flex md:space-x-8">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <HoveredLink
                    className="backdrop-blur-sm backdrop-brightness-50 p-3"
                    href="/commands"
                  >
                    Commands
                  </HoveredLink>
                  <HoveredLink
                    className="backdrop-blur-sm backdrop-brightness-50 p-3"
                    href="/status"
                  >
                    Status
                  </HoveredLink>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Help</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="https://discord.gg/brew">
                              <div className="flex gap-2 font-medium">
                                Support Server <BsBoxArrowUpRight />
                              </div>
                              <div className="text-muted-foreground">
                                Open a ticket and ask for help.
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link href="https://docs.brewbot.xyz">
                              <div className="flex gap-2 font-medium">
                                Documentation <BsBoxArrowUpRight />
                              </div>
                              <div className="text-muted-foreground">
                                Learn how to use the Brew bot.
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div
              className="hidden space-x-2 w-1/3 items-center justify-end md:flex"
              aria-label="Join our Discord server"
            >
              <SignedOut>
                <Button variant="blue" className="ml-2" onClick={handleSignIn}>
                  Login With Discord
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    layout: {
                      shimmer: false,
                      socialButtonsPlacement: "bottom",
                      socialButtonsVariant: "iconButton",
                      termsPageUrl: "/terms",
                      privacyPageUrl: "/privacy",
                      unsafe_disableDevelopmentModeWarnings: true,
                    },
                    elements: {
                      userButtonAvatarBox: {
                        width: "2.5rem",
                        height: "2.5rem",
                      },
                      button__manageAccount: {
                        display: "none",
                      },
                      // userButtonPopoverFooter: {
                      //   display: "none",
                      // },
                    },
                  }}
                >
                </UserButton>
                <HoveredLink
                  className="backdrop-blur-sm backdrop-brightness-50 p-3"
                  href="/dashboard"
                >
                  Dashboard
                </HoveredLink>
              </SignedIn>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Navbar);
