"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const ItemSwitcher = ({
  items,
  duration = 5000,
  className,
}: {
  items: React.ReactNode[];
  duration?: number;
  className?: string;
}) => {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const nextIndex = (currentElementIndex + 1) % items.length;
    setCurrentElementIndex(nextIndex);
    setIsAnimating(true);
  }, [currentElementIndex, items.length]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setTimeout(() => {
          setIsAnimating(false);
        }, 100); // Small delay before starting the next animation
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(8px)",
          y: 500, // Start from below
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 500, // Move to original position
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        exit={{
          opacity: 0,
          filter: "blur(8px)",
          y: -2000, // Move upwards
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-1",
          className
        )}
        key={currentElementIndex}
      >
        {items[currentElementIndex]}
      </motion.div>
    </AnimatePresence>
  );
};
