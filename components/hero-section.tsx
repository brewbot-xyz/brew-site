import { motion, useAnimate } from "motion/react";
import Link from "next/link";
import { BsChevronRight, BsPlusLg } from "react-icons/bs";
import { Button } from "./ui/button";
import CardTrack from "./card-track";
import { GrowLogo } from "./grow-logo";
import ScrollIndicator from "./icons/scroll-indicator";
import Ticker from "./stats-ticker";

const HeroSection = () => {
  const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
  const [scope, animate] = useAnimate();

  return (
    <section className="w-full flex flex-col items-center justify-center relative">
      <div className="relative z-10 text-center w-full mx-auto pt-4 pb-12">
        <CardTrack>
          <motion.div
            className="text-lg font-mono flex flex-col items-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...transition, delay: 0.1 }}
          >
            <GrowLogo />
            <motion.section ref={scope} initial={{ y: 20, opacity: 0 }}>
              <Ticker scope={scope} animate={animate} />
              <div className="flex  gap-4 justify-center mt-5">
                <Link href="https://discord.com/oauth2/authorize?client_id=1076140187471593492&permissions=8&scope=applications.commands%20bot">
                  <Button size="lg">
                    <BsPlusLg className="size-5 mr-1" /> Add to Discord
                  </Button>
                </Link>
                <Link href="https://discord.gg/brew">
                  <Button variant="secondary" size="lg">
                    Buy Now <BsChevronRight className="size-5 ml-1" />
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
