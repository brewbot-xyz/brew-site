"use client";

import { motion } from "motion/react";

import Navbar from "@/app/components/navbar";
import { WavyBackground } from "@/app/components/wavy-background";
import { transition } from "@/lib/constants";
import { trpc } from "@/lib/trpc";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import { FeaturesSection } from "./components/landing/features-section";
import { InlineQueryBanner } from "./components/landing/inline-query-banner";
import { ModerationSection } from "./components/landing/moderation-section";
import { VoiceSection } from "./components/landing/voice-section";

export default function Landing() {
  const q = trpc.discord.demoUsers.useQuery(undefined, {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const users = q.data ?? [];

  return (
    <WavyBackground
      blur={0}
      className="relative flex min-h-screen w-full flex-col items-center antialiased"
      colors={["#090C05", "#161007", "#231508", "#30190A", "#3d1d0b"]}
      waveOpacity={1}
      wavewidth={100}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={transition}
      >
        <Navbar />
      </motion.div>
      <HeroSection />
      <motion.main
        animate={{ opacity: 1 }}
        className="relative flex w-full flex-col items-center justify-center m:px-24 px-6"
        initial={{ opacity: 0 }}
        transition={transition}
      >
        <div className="mb-24 grid grid-cols-1 gap-24 lg:grid-cols-2">
          <InlineQueryBanner
            isFetching={q.isFetching}
            onRetry={() => void q.refetch()}
            show={q.isError}
          />
          <FeaturesSection />
          <VoiceSection users={users} />
          <ModerationSection users={users} />
        </div>
      </motion.main>
      <Footer />
    </WavyBackground>
  );
}
