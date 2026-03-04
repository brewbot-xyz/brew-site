"use client";

import { motion, useAnimate, useInView } from "motion/react";
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
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          damping: 11,
        },
      );
    }
  }, [animate, isInView]);

  return (
    <div ref={scope}>
      <motion.div initial={{ display: "none" }} className="inline z-50">
        <Image
          className="drop-shadow-lg"
          draggable={false}
          src="/assets/hero-logo.png"
          alt="Brew"
          width={500}
          height={500}
          quality={100}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};
