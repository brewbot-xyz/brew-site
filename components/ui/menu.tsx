import { cn } from "@/lib/utils";
import Link from "next/link";

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
        "relative flex justify-between rounded-none border-0 border-secondary-accent bg-background/70 px-6 pb-4 pt-2 shadow-input backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:border-2 md:py-3",
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
        "cursor-pointer text-foreground transition-colors hover:text-vibrant rounded-full",
        className,
      )}
    >
      {children}
    </Link>
  );
};
