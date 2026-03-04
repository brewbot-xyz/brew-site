"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";

export default function FAQ() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center antialiased -z-50">
      <Navbar>
        <div className="my-4 flex h-[52px] w-full justify-between px-4 md:my-10 md:px-10">
          <div className="flex items-center text-3xl font-bold">
            <BsQuestionCircleFill className="mr-2" />
            <span className="flex md:hidden xl:flex">FAQ</span>
          </div>
        </div>
      </Navbar>
      <div className="mb-16 flex md:pt-32 max-w-4xl flex-col gap-3 bg-background p-4">
        <div className="flex items-center text-3xl font-bold">
          <span className="flex md:hidden">FAQ</span>
        </div>
        <span>
          <h6 className="text-xl font-bold md:text-2xl">How can I access the bot?</h6>
          You can start with a 2-week free trial and then opt for a lifetime purchase for only $20.
        </span>
        <span>
          <h6 className="text-xl font-bold md:text-2xl">
            How often are new updates and features added to the bot?
          </h6>
          Updates and features are regularly added to enhance the bot&apos;s functionality and user
          experience.
        </span>
        <span>
          <h6 className="text-xl font-bold md:text-2xl">
            Do you offer customer support for troubleshooting or assistance?
          </h6>
          Yes, we provide support to help with any issues or queries you may have regarding the bot.
          Join our{" "}
          <Link href="https://discord.gg/brew">
            <Button variant="link">support server</Button>
          </Link>{" "}
          for assistance.
        </span>
        <span>
          <h6 className="text-xl font-bold md:text-2xl">
            Can I use the bot on multiple servers with a single purchase?
          </h6>
          The lifetime subscription allows you to use the bot on one server. Additional servers may
          require separate purchases.
        </span>
        <span>
          <h6 className="text-xl font-bold md:text-2xl">
            The bot is not responding, what should I do?
          </h6>
          Head over to the{" "}
          <Link href="/status">
            <Button variant="link">status page</Button>
          </Link>{" "}
          to check if the bot is online. If the bot is operating as intended and still not
          responding, join our{" "}
          <Link href="https://discord.gg/brew">
            <Button variant="link">support server</Button>
          </Link>{" "}
          for assistance.
        </span>
        <span>
          <h6 className="text-xl font-bold md:text-2xl">
            Does Brew offer an antinuke/raid prevention system?
          </h6>
          Brew includes an antinuke system designed to detect and ban malicious users. This system
          also prevents staff members from mass-kicking, mass-banning, or making other unauthorized
          changes to the server.
        </span>
      </div>
    </div>
  );
}
