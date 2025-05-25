import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

function ScrollIndicator() {
  const scrolled = useScrolled();

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.div
        className={cn("flex flex-col items-center", scrolled ? "opacity-100" : "opacity-0")}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-primary-foreground font-mono font-bold text-lg mb-2">Learn More</span>
        <svg
          className="animate-bounce w-6 h-6 text-brew-text-muted"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="var(--primary-foreground)"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default React.memo(ScrollIndicator);
