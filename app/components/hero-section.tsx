import { motion, type Transition, useAnimate } from "motion/react";
import Link from "next/link";
import { BsChevronRight, BsPlusLg } from "react-icons/bs";
import { Button } from "./button";
import CardTrack from "./card-track";
import { GrowLogo } from "./grow-logo";
import ScrollIndicator from "./icons/scroll-indicator";
import Ticker from "./stats-ticker";

const HeroSection = () => {
  const transition = {
    duration: 0.4,
    ease: [0.43, 0.13, 0.23, 0.96],
  } satisfies Transition;
  const [scope, animate] = useAnimate();

  return (
    <section className="relative flex w-full flex-col items-center justify-center">
      <div className="relative z-10 mx-auto w-full pt-4 pb-12 text-center">
        <CardTrack>
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 flex flex-col items-center font-mono text-lg"
            initial={{ y: 20, opacity: 0 }}
            transition={{ ...transition, delay: 0.1 }}
          >
            <GrowLogo />
            <motion.section initial={{ y: 20, opacity: 0 }} ref={scope}>
              <Ticker animate={animate} scope={scope} />
              <div className="mt-5 flex justify-center gap-4">
                <Link href="https://discord.com/oauth2/authorize?client_id=1076140187471593492&permissions=8&scope=applications.commands%20bot">
                  <Button size="lg">
                    <BsPlusLg className="mr-1 size-5" /> Add to Discord
                  </Button>
                </Link>
                <Link href="https://discord.gg/brew">
                  <Button size="lg" variant="secondary">
                    Buy Now <BsChevronRight className="ml-1 size-5" />
                  </Button>
                </Link>
              </div>
            </motion.section>
          </motion.div>
        </CardTrack>
      </div>
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
