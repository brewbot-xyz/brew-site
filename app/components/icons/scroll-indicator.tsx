import { motion } from "motion/react";
import React from "react";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

function ScrollIndicator() {
  const scrolled = useScrolled();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
      initial={{ opacity: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        className={cn(
          "flex flex-col items-center",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="mb-2 font-bold font-mono text-lg text-primary-foreground">
          Learn More
        </span>
        <svg
          aria-label="down arrow"
          className="h-6 w-6 animate-bounce text-brew-text-muted"
          fill="none"
          role="img"
          stroke="var(--primary-foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default React.memo(ScrollIndicator);
