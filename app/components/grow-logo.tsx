"use client";

import { motion, useAnimate, useInView } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

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
      <motion.div className="z-50 inline" initial={{ display: "none" }}>
        <Image
          alt="Brew"
          className="drop-shadow-lg"
          draggable={false}
          height={500}
          loading="lazy"
          quality={80}
          src="/assets/hero-logo.png"
          width={500}
        />
      </motion.div>
    </div>
  );
};
