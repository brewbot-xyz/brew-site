import Link from "next/link";
import { BsAt, BsDiscord, BsEnvelopeAtFill, BsGithub, BsTwitterX } from "react-icons/bs";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "./popover";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black/20 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/brew.png"
                alt="Brew"
                className="w-8 h-8 rounded-md"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-white">Brew</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              The best all-in-one bot for keeping your community safe and engaged.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://docs.brewbot.xyz"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/brew"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Support Server
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/brew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <BsDiscord className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/discordbrew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <BsTwitterX className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/orgs/brewbot-xyz/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <BsGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} brewbot.xyz. All rights reserved.
          </p>
          <p className="text-white/60 text-sm mt-2 md:mt-0">
            Made with ❤️ by{" "}
            <Popover>
              <PopoverTrigger className="underline" aria-label="Verified App">
                Jesse
              </PopoverTrigger>
              <PopoverContent side="top" className="outline-1 outline-muted">
                <PopoverArrow className="fill-muted" />
                <span className="font-semibold">Lead Bot Developer</span>
                <span className="flex items-center gap-1">
                  <BsAt />
                  fcby
                </span>
                <span className="flex items-center gap-1">
                  <BsEnvelopeAtFill />
                  jesse@brewbot.xyz
                </span>
              </PopoverContent>
            </Popover>{" "}
            &{" "}
            <Popover>
              <PopoverTrigger className="underline" aria-label="Verified App">
                Caden
              </PopoverTrigger>
              <PopoverContent side="top" className="outline-1 outline-muted">
                <PopoverArrow className="fill-muted" />
                <span className="font-semibold">Lead Web Developer</span>
                <span className="flex items-center gap-1">
                  <BsAt />
                  1koj
                </span>
                <span className="flex items-center gap-1">
                  <BsEnvelopeAtFill />
                  caden@brewbot.xyz
                </span>
              </PopoverContent>
            </Popover>
          </p>
        </div>
      </div>
    </footer>
  );
}
