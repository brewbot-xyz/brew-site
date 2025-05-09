"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";
import { BsDiscord, BsFillHouseFill, BsHeartPulseFill, BsStack } from "react-icons/bs";

import { absoluteUrl, cn } from "@/lib/utils";
import Image from "next/image";
import { DialogBox } from "./dialog";
import DiscordAppsIcon from "./icons/discord-apps";
import { HoveredLink, Menu } from "./menu";
import Profile from "./profile";
import Link from "next/link";
import { Button } from "./button";

import { SignedIn, SignedOut, UserButton, useSignIn } from "@clerk/nextjs";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const { signIn } = useSignIn();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = useCallback(() => {
    if (window !== undefined && signIn) {
      const popup = window.open("about:blank", "Sign In", "width=800,height=777");
      signIn.authenticateWithPopup({
        strategy: "oauth_discord",
        redirectUrl: absoluteUrl("/sign-in/sso-callback"),
        redirectUrlComplete: "/",
        popup,
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [signIn]);

  return (
    <div>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto md:bottom-auto md:top-10 flex items-center transition-all",
          "md:max-w-full xl:max-w-full 2xl:max-w-full md:top-10"
          // scrolled
          //   ? "md:h-[64px] bg-transparent md:top-0 md:border-b-2 [border-image:linear-gradient(to_right,transparent,var(--primary-accent),transparent)_30]"
          //   : "md:h-[52px] bg-transparent md:border-b-2 [border-image:linear-gradient(to_right,transparent_50%,var(--primary-accent),transparent_50%)_30]"
        )}
      >
        <div className={"bottom-0 absolute w-full h-full bg-transparent"}></div>
        <div className="hidden md:flex w-full z-10 pointer-events-none">{children}</div>
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 mx-auto md:top-10 transition-all",
            scrolled
              ? "md:h-[62px] md:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[60%] md:top-0"
              : "md:h-[50px] md:max-w-md xl:max-w-xl 2xl:max-w-3xl md:top-10"
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
              <Image
                src="/brew.png"
                alt="Brew"
                width={36}
                height={36}
                className="transition-all size-9 mr-3 rounded-full"
              />
              <HoveredLink
                className={cn("transition-all font-semibold flex items-center")}
                href="/"
              >
                <span className="hidden xl:inline-block">Home</span>
              </HoveredLink>
            </div>
            <div className="hidden items-center font-semibold justify-center space-x-4 md:flex md:space-x-8">
              <HoveredLink href="/commands">Commands</HoveredLink>
              <HoveredLink href="/status">Status</HoveredLink>
              <HoveredLink href="/faq">FAQ</HoveredLink>
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
            <SignedOut>
              <Button variant="blue" rounded="xl" size="icon" onClick={handleSignIn}>
                Sign In
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    button__manageAccount: {
                      display: "none",
                    },
                    userButtonPopoverFooter: {
                      display: "none",
                    },
                  },
                }}
              />
            </SignedIn>
          </Menu>
        </div>
      </div>
    </div>
  );
}
