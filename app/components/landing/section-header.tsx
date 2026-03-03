import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

export function SectionHeader(props: {
  className?: string;
  title: string | [string, string];
  icon?: IconType;
  description: ReactNode;
}) {
  return (
    <section
      className={`relative px-4 text-center sm:px-0 ${props.className ?? ""}`}
    >
      <h2 className="font-bold text-2xl leading-tight sm:text-3xl lg:text-4xl">
        {Array.isArray(props.title) && props.title.length > 1 && (
          <span className="hidden sm:inline">{props.title[0]} </span>
        )}
        <span className="mt-2 inline-flex items-center gap-2 rounded-2xl border border-primary-accent/75 bg-linear-to-b from-primary/75 to-primary/25 px-2 py-2 text-primary-foreground backdrop-blur-sm sm:mt-0 sm:gap-3 sm:px-3 sm:py-1.5">
          {Array.isArray(props.title)
            ? props.title[props.title.length - 1]
            : props.title}
          {props.icon && <props.icon />}
        </span>
      </h2>
      <p className="mx-auto mt-2 max-w-2xl font-normal text-sm text-white/70 leading-relaxed sm:text-base">
        {props.description}
      </p>
    </section>
  );
}
