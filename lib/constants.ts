import { cva } from "class-variance-authority";
import { Transition } from "motion/react";

/**
 * Default transition for the app
 */
export const transition = {
  duration: 1.5,
  delay: 1,
  ease: "easeInOut",
} satisfies Transition;

/**
 * Background variants for the app
 */
export const backgroundVariants = cva("", {
  variants: {
    variant: {
      default: `
      radial-gradient(ellipse 800px 600px at 10% 20%, rgba(107, 53, 17, 0.3) 0%, transparent 70%),
      radial-gradient(ellipse 600px 800px at 90% 80%, rgba(45, 21, 5, 0.4) 0%, transparent 65%),
      radial-gradient(ellipse 700px 500px at 30% 90%, rgba(80, 40, 12, 0.25) 0%, transparent 60%),
      radial-gradient(ellipse 900px 700px at 70% 10%, rgba(60, 30, 8, 0.35) 0%, transparent 75%),
      linear-gradient(135deg, rgb(45, 21, 5) 0%, rgb(30, 14, 3) 50%, rgb(15, 7, 2) 100%)
    `,
      greyscale: `
      radial-gradient(ellipse 800px 600px at 10% 20%, rgb(38, 38, 41) 0%, transparent 70%),
      radial-gradient(ellipse 600px 800px at 90% 80%, rgb(31, 31, 34) 0%, transparent 65%),
      radial-gradient(ellipse 700px 500px at 30% 90%, rgb(24, 24, 27) 0%, transparent 60%),
      radial-gradient(ellipse 900px 700px at 70% 10%, rgb(17, 17, 20) 0%, transparent 75%),
      linear-gradient(135deg, #27272a 0%, #18181b 50%, #000000 100%)
    `,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
