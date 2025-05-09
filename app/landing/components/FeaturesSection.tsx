import React, { JSX } from "react";
import { motion } from "motion/react";
import CommandDisplay from "./CommandDisplay";
import FeatureGrid from "./FeatureGrid";
import { parseInfo } from "@/lib/utils";

interface FeaturesSectionProps {
  users: {
    name: string;
    avatarUrl: string;
  }[];
  found: string;
  isMobile: boolean;
}

const FeaturesSection = ({ users, found, isMobile }: FeaturesSectionProps) => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-xl text-brew-text-secondary max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything you need to enhance your Discord server experience
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Minigame System</h3>
            <p className="text-brew-text-secondary mb-6">
              Search for items, craft tools, buy weapons, and fight bosses while
              leveling up!
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <CommandDisplay user={users[0]} reply=",search" className="h-full">
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-0.5">
                  {parseInfo(found)}
                </div>
                <div>
                  <img
                    src="https://i.ibb.co/t4bZYqH/Screenshot-2024-01-28-184334.png"
                    alt="Forest"
                    className="mb-4 hidden h-auto w-24 rounded-md lg:block"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </CommandDisplay>
          </motion.div>

          {/* Voice Master Feature */}
          {[
            <motion.div
              key={0}
              initial={{ x: isMobile ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <CommandDisplay className="h-full">
                <span className="text-xl font-semibold">
                  {parseInfo(
                    "Voicemaster Commands <:commands:1251734109298884728>",
                    24
                  )}
                </span>
                {parseInfo(
                  `
<:white_unlock:1232100904367292479> \`vc unlock\` -> Unlocks your vc to other members.
<:lock:1250250408912490516> \`vc lock\` -> Locks your vc from other members.
<:ban:1250250746717536266> \`vc ban (user)\` -> Bans a user from joining your vc.
<:white_staff:1250966358326251592> \`vc unban (user)\` -> Unbans a user from your vc.
<:permit:1250251725491671102> \`vc permit (user)\` -> Allows a user to join your vc.
<:white_mute:1251845771318394911> \`vc stfu (user)\` -> Server mutes a user in your vc.
<:white_unmute:1251846619683356814> \`vc unmute (user)\` -> Server unmute a user in your vc.
<:white_crown:1251750590447358066> \`vc transfer (user)\` -> Transfers the vc ownership to another user.
`
                )}
              </CommandDisplay>
            </motion.div>,
            <motion.div
              key={1}
              className="flex flex-col justify-center"
              initial={{ x: isMobile ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4">Manage Voice Channels</h3>
              <p className="text-brew-text-secondary mb-6">
                Create temporary voice channels, set user limits, and manage
                access with ease.
              </p>
            </motion.div>,
          ].reduce((acc: JSX.Element[], el) => {
            if (isMobile) acc.unshift(el);
            else acc.push(el);
            return acc;
          }, [])}

          {/* Moderation Feature */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">General Moderation</h3>
            <p className="text-brew-text-secondary mb-6">
              Kick, ban, mute, and warn users with ease. View user information
              and audit logs.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <CommandDisplay className="h-full">
              {users[1] && (
                <span className="items-center font-semibold">
                  <img
                    aria-label="User Avatar"
                    src={users[1].avatarUrl}
                    alt="User Avatar"
                    className="mr-2 inline-block size-7 rounded-full"
                    width={160}
                    height={160}
                  />
                  <span className="font-medium">{users[1].name}</span>
                </span>
              )}
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-lg font-semibold">Command: ban</h3>
                <span>Bans a member from the guild.</span>
                <span>
                  {parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}
                </span>
                <code className="p-2 bg-black/30 block rounded-md">
                  ban (member) (reason)
                </code>
                <span>Page 1/1 (1 page)</span>
              </div>
            </CommandDisplay>
          </motion.div>
        </div>

        {/* Feature Grid Section */}
        <motion.div
          className="mb-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">More Features</h3>
            <p className="text-brew-text-secondary">
              Discover all the tools and features that Brew offers
            </p>
          </div>

          <FeatureGrid
            features={[
              {
                title: "Auto Moderation",
                description:
                  "Automatically filter content, prevent spam, and keep your server clean.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.618 5.984A11.955 11.955 0 0112 2.5c-2.968 0-5.701 1.085-7.798 2.882-.205.226-.396.432-.572.648m20.182 0A8.001 8.001 0 016.288 19.212m15.324-13.228A23.931 23.931 0 0112 10.75c-4.358 0-8.402-1.176-11.845-3.207"
                    />
                  </svg>
                ),
              },
              {
                title: "Custom Commands",
                description:
                  "Create your own custom commands with variables and responses.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Server Analytics",
                description:
                  "Track activity, member growth, and engagement in your server.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                ),
              },
              {
                title: "Economy System",
                description:
                  "Full economy with currency, shops, jobs, and trading.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Role Management",
                description:
                  "Auto roles, reaction roles, and role hierarchy management.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Music Player",
                description:
                  "High-quality music playback from YouTube, Spotify, and more.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                ),
              },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
