"use client";

import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

import Image from "next/image";

export const GrowLogo = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "div",
        {
          display: "inline-block",
          transform: "scale(1)",
          width: "fit-content",
        },
        {
          duration: 0.3,
          ease: "easeInOut",
          type: "spring",
          damping: 7,
        }
      );
    }
  }, [animate, isInView]);

  return (
    <div ref={scope}>
      <motion.div initial={{ display: "none" }} className="inline">
        <Image
          draggable={false}
          src="/retro.webp"
          alt="Brew"
          width={400}
          height={400}
          quality={100}
          priority
        />
      </motion.div>
    </div>
  );
};
