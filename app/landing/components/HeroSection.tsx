import React from 'react';
import { motion } from 'motion/react';
import GlowingButton from './GlowingButton';
import { BsPlusLg } from 'react-icons/bs';

interface HeroProps {
  stats: {
    users: number;
    guilds: number;
  };
  scrollY: number;
}

const HeroSection = ({ stats, scrollY }: HeroProps) => {
  const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 relative">
      <div className="absolute inset-0 z-0 bg-[#080303] opacity-80"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 bg-grid-pattern bg-[size:40px_40px] opacity-20"></div>
      
      {/* Radial gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-brew-highlight/10 via-transparent to-transparent opacity-70"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.div
          className="mb-6 inline-block"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={transition}
        >
          <div className="w-24 h-24 mx-auto bg-brew-highlight rounded-2xl mb-6 animate-pulse-glow flex items-center justify-center">
            <span className="text-white text-5xl font-bold">B</span>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...transition, delay: 0.1 }}
        >
          The Ultimate Discord Bot
        </motion.h1>
        
        <motion.p 
          className="text-xl text-brew-text-secondary mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...transition, delay: 0.2 }}
        >
          Enhance your Discord server with moderation tools, voice channels, and fun minigames
        </motion.p>
        
        <motion.div
          className="text-lg relative mx-auto flex flex-col items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.3 }}
        >
          <span className="font-mono font-black italic">PROUDLY SERVING</span>
          <section className="font-mono text-center text-white/50">
            <span className="font-bold text-white">
              {stats?.users.toLocaleString()}
            </span>
            <span> users&#x2003;</span>
            <span className="font-bold text-white">
              {stats?.guilds.toLocaleString()}
            </span>
            <span> servers&#x2003;</span>
          </section>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...transition, delay: 0.4 }}
        >
          <GlowingButton 
            href="https://discord.com/oauth2/authorize?client_id=1076140187471593492&permissions=8&scope=applications.commands%20bot"
            size="lg"
          >
            <BsPlusLg className="size-4 mr-2" /> Add to Discord
          </GlowingButton>
          
          <GlowingButton 
            href="https://discord.gg/brew"
            variant="secondary"
            size="lg"
          >
            Buy Now
          </GlowingButton>
        </motion.div>
        
        <motion.span
          className={`mt-8 font-mono text-sm text-white/50 transition-opacity ${
            scrollY === 0 ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY === 0 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-bold">TIP:</span> Click on Brew&apos;s profile!
        </motion.span>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-brew-text-muted text-sm mb-2">Scroll to explore</span>
          <svg 
            className="animate-bounce w-6 h-6 text-brew-text-muted" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;