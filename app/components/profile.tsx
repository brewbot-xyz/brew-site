"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  BsDiscord,
  BsFileEarmarkRichtextFill,
  BsFillHouseFill,
  BsHeartPulseFill,
  BsPlusLg,
  BsQuestionCircleFill,
} from "react-icons/bs";
import AppTag from "./app-tag";
import { Button } from "./button";
import DiscordAppsIcon from "./icons/discord-apps";

export default function Profile() {
  return (
    <>
      <div className="mb-8 h-16 rounded-lg" />
      <div className="absolute top-4 left-3 flex">
        <div className="relative">
          <Image
            alt="Brew"
            className="rounded-full border-8 border-secondary"
            draggable={false}
            height={110}
            src="/assets/brew.png"
            width={110}
          />
          <div className="absolute right-2 bottom-2">
            <div className="size-6 rounded-full border-4 border-secondary bg-violet-500" />
          </div>
        </div>
      </div>
      <div className="m-4 mt-8 rounded-2xl bg-zinc-800/25 px-4 py-3">
        <div className="flex items-center justify-between space-x-4 text-white">
          <span>
            <h1 className="font-semibold text-lg">Brew</h1>
            <h3 className="flex items-center space-x-1 text-sm">
              <span>Brew#6363</span>
              <AppTag />
            </h3>
          </span>
          <span className="flex gap-2 text-sm">
            <Link href="https://discord.gg/brew">
              <Button rounded="xl" size="icon" variant="blue">
                <BsDiscord className="size-5" />
              </Button>
            </Link>
            <Link href="https://discord.com/oauth2/authorize?client_id=1076140187471593492&permissions=8&scope=applications.commands%20bot">
              <Button className="w-full" rounded="xl" variant="tertiary">
                <BsPlusLg className="mr-1.5 size-4" />
                Add App
              </Button>
            </Link>
          </span>
        </div>
        <hr className="mt-2 border-zinc-800" />
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xs uppercase">Resources</h2>
            <div className="flex w-full justify-end gap-2">
              <Link href="/">
                <Button
                  className="w-full p-0"
                  rounded="xl"
                  size="icon"
                  variant="ghost"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 1 },
                    }}
                  >
                    <BsFillHouseFill className="size-4" />
                  </motion.div>
                </Button>
              </Link>
              <Link href="/commands">
                <Button
                  className="w-full p-0"
                  rounded="xl"
                  size="icon"
                  variant="ghost"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 1 },
                    }}
                  >
                    <DiscordAppsIcon className="size-4" />
                  </motion.div>
                </Button>
              </Link>
              <Link href="/status">
                <Button
                  className="w-full p-0"
                  rounded="xl"
                  size="icon"
                  variant="ghost"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 1 },
                    }}
                  >
                    <BsHeartPulseFill className="size-4" />
                  </motion.div>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/faq">
              <Button className="w-full" rounded="xl" variant="tertiary">
                <BsQuestionCircleFill className="mr-1.5 size-4" />
                FAQ
              </Button>
            </Link>
            <Link href="https://docs.brewbot.xyz">
              <Button className="w-full" rounded="xl" variant="tertiary">
                <BsFileEarmarkRichtextFill className="mr-1.5 size-4" />
                Docs
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="mb-2 font-semibold text-xs uppercase">Created On</h2>
          <p className="flex items-center text-sm text-zinc-400">
            <BsDiscord className="mr-1" /> Feb 17, 2023
          </p>
        </div>
      </div>
    </>
  );
}
