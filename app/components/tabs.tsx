"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { backgroundVariants } from "@/lib/constants";
import { VariantProps } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof backgroundVariants> {}

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, children, variant = "default", ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex flex-col p-3 rounded-2xl border-0 border-card-accent bg-card shadow-sm relative w-full overflow-hidden",
        variant === "default" ? "text-card-foreground" : "text-secondary-foreground",
        className,
      )}
      style={{
        background: backgroundVariants({ variant }),
      }}
      {...props}
    >
      <div
        className={cn(
          `absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${variant === "default" ? "via-card-foreground" : "via-secondary-foreground"} to-transparent opacity-60`,
        )}
      />
      {children}
    </TabsPrimitive.List>
  ),
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-4 py-3 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
