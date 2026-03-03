import Image from "next/image";
import Link from "next/link";
import {
  BsAt,
  BsDiscord,
  BsEnvelopeAtFill,
  BsGithub,
  BsTwitterX,
} from "react-icons/bs";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-white/10 border-t bg-black/20 pb-16 backdrop-blur-sm md:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-4 gap-8 md:grid-cols-6">
          <div className="col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <Image
                alt="Brew"
                className="h-8 w-8 rounded-md"
                height={32}
                src="/assets/brew.png"
                width={32}
              />
              <span className="font-bold text-white text-xl">Brew</span>
            </div>
            <p className="max-w-xs text-sm text-white/70 leading-relaxed">
              The best all-in-one bot for keeping your community safe and
              engaged.
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href="https://docs.brewbot.xyz"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href="https://discord.gg/brew"
                >
                  Support Server
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href="/terms"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 place-items-end md:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Community</h3>
            <div className="flex space-x-4">
              <a
                aria-label="Discord"
                className="text-white/70 transition-colors hover:text-white"
                href="https://discord.gg/brew"
                rel="noopener noreferrer"
                target="_blank"
              >
                <BsDiscord className="h-5 w-5" />
              </a>
              <a
                aria-label="Twitter"
                className="text-white/70 transition-colors hover:text-white"
                href="https://twitter.com/discordbrew"
                rel="noopener noreferrer"
                target="_blank"
              >
                <BsTwitterX className="h-5 w-5" />
              </a>
              <a
                aria-label="GitHub"
                className="text-white/70 transition-colors hover:text-white"
                href="https://github.com/orgs/brewbot-xyz/discussions"
                rel="noopener noreferrer"
                target="_blank"
              >
                <BsGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-white/10 border-t pt-6 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} brewbot.xyz. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-white/60 md:mt-0">
            Made with ❤️ by{" "}
            <Popover>
              <PopoverTrigger aria-label="Verified App" className="underline">
                Jesse
              </PopoverTrigger>
              <PopoverContent className="outline-1 outline-muted" side="top">
                <PopoverArrow className="fill-muted" />
                <span className="font-semibold">Lead Bot Developer</span>
                <span className="flex items-center gap-1">
                  <BsAt />
                  vosquz
                </span>
                <span className="flex items-center gap-1">
                  <BsEnvelopeAtFill />
                  jesse@brewbot.xyz
                </span>
              </PopoverContent>
            </Popover>{" "}
            &{" "}
            <Popover>
              <PopoverTrigger aria-label="Verified App" className="underline">
                the team
              </PopoverTrigger>
              <PopoverContent
                className="flex w-42 flex-col outline-1 outline-muted"
                side="top"
              >
                <PopoverArrow className="fill-muted" />
                <span className="text-center font-semibold underline">
                  Web Developers
                </span>
                <span className="flex justify-between">
                  Caden
                  <span className="flex items-center">
                    <BsAt />
                    c5den
                  </span>
                </span>
                <span className="mt-1 text-center font-semibold underline">
                  Bot Developers
                </span>
                <span className="flex justify-between">
                  Shades
                  <span className="flex items-center">
                    <BsAt />
                    shxdes0
                  </span>
                </span>
                <span className="flex justify-between">
                  Jah
                  <span className="flex items-center">
                    <BsAt />
                    deeped
                  </span>
                </span>
              </PopoverContent>
            </Popover>
          </p>
        </div>
      </div>
    </footer>
  );
}
