import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

import { Card } from "../card";

// type Img = {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
//   quality?: number;
//   priority?: boolean;
//   className?: string;
//   sizes?: string;
// };

export function FeatureCard(props: {
  className?: string;
  title: string;
  icon: ReactNode;
  description: string;
  image: ImageProps;
  imagePlacement?: "top" | "bottom";
  topContentClassName?: string;
}) {
  const image = <Image {...props.image} />;

  const header = (
    <div className={props.topContentClassName ?? "p-3 text-center sm:p-6"}>
      <h3 className="mb-2 flex items-center justify-center gap-2 font-semibold text-lg text-primary-foreground sm:gap-3 sm:text-xl lg:text-2xl">
        <span>{props.title}</span>
        {props.icon}
      </h3>
      <p className="text-white/70 text-xs leading-relaxed sm:text-sm">
        {props.description}
      </p>
    </div>
  );

  return (
    <Card className={props.className}>
      {props.imagePlacement === "bottom" ? (
        <>
          {header}
          {image}
        </>
      ) : (
        <>
          {image}
          {header}
        </>
      )}
    </Card>
  );
}
