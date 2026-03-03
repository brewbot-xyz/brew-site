import Link from "next/link";
import { cn } from "@/lib/utils";

export const Menu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      className={cn(
        "relative flex justify-between rounded-none border-0 border-secondary-accent bg-background/70 px-6 pt-2 pb-4 shadow-input backdrop-blur-md md:border-2 md:bg-transparent md:py-3 md:backdrop-blur-none",
        className,
      )}
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "className">) => {
  return (
    <Link
      {...rest}
      className={cn(
        "cursor-pointer rounded-full text-foreground transition-colors hover:text-vibrant",
        className,
      )}
    >
      {children}
    </Link>
  );
};
