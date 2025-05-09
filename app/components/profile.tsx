"use client";

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

import { motion } from "motion/react";
import { Button } from "./button";
import AppTag from "./app-tag";
import DiscordAppsIcon from "./icons/discord-apps";

export default function Profile() {
  return (
    <>
      <div className="mb-8 h-16 rounded-lg" />
      <div className="absolute left-3 top-4 flex">
        <div className="relative">
          <Image
            draggable={false}
            className="rounded-full border-[8px] border-secondary"
            src="/brew.png"
            alt="Brew"
            width={110}
            height={110}
          />
          <div className="absolute bottom-2 right-2">
            <div className="size-6 bg-violet-500 border-[4px] border-secondary rounded-full" />
          </div>
        </div>
      </div>
      <div className="m-4 mt-8 rounded-2xl bg-zinc-800/25 px-4 py-3">
        <div className="justify-between flex items-center space-x-4 text-white">
          <span>
            <h1 className="text-lg font-semibold">Brew</h1>
            <h3 className="flex items-center space-x-1 text-sm">
              <span>Brew#6363</span>
              <AppTag />
            </h3>
          </span>
          <span className="flex gap-2 text-sm">
            <Link href="https://discord.gg/brew">
              <Button variant="blue" rounded="xl" size="icon">
                <BsDiscord className="size-4" />
              </Button>
            </Link>
            <Link href="https://discord.com/oauth2/authorize?client_id=1076140187471593492&permissions=8&scope=applications.commands%20bot">
              <Button className="w-full" variant="tertiary" rounded="xl">
                <BsPlusLg className="mr-1.5 size-4" />
                Add App
              </Button>
            </Link>
          </span>
        </div>
        <hr className="mt-2 border-zinc-800" />
        <div>
          <div className="flex justify-between items-center ">
            <h2 className="text-xs font-semibold uppercase">Resources</h2>
            <div className="w-full flex justify-end gap-2">
              <Link href="/">
                <Button
                  className="w-full p-0"
                  variant="ghost"
                  rounded="xl"
                  size="icon"
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
                  variant="ghost"
                  rounded="xl"
                  size="icon"
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
                  variant="ghost"
                  rounded="xl"
                  size="icon"
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
              <Button className="w-full" variant="tertiary" rounded="xl">
                <BsQuestionCircleFill className="mr-1.5 size-4" />
                FAQ
              </Button>
            </Link>
            <Link href="https://docs.brewbot.xyz">
              <Button className="w-full" variant="tertiary" rounded="xl">
                <BsFileEarmarkRichtextFill className="mr-1.5 size-4" />
                Docs
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="mb-2 text-xs font-semibold uppercase">Created On</h2>
          <p className="flex items-center text-sm text-zinc-400">
            <BsDiscord className="mr-1" /> Feb 17, 2023
          </p>
        </div>
      </div>
    </>
  );
}
