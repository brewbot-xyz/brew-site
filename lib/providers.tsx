"use client";
// ^-- to make sure we can mount the Provider from a server component
import Footer from "@/components/footer";
import Scrollbars from "@/components/scrollbars";
import { useGpuTier } from "@/hooks/use-gpu-tier";
import type { AppRouter } from "@/server/routers/_app";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";
import { makeQueryClient } from "./query-client";
import { trpc } from "./trpc";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
let browserQueryClient: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}
export default function Providers(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const pathname = usePathname();
  const shouldShowFooter = pathname !== "/" && !pathname.startsWith("/dashboard");
  const gpuTier = useGpuTier();
  const [styles, setStyles] = useState<CSSStyleDeclaration | null>(null);
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink(),
        httpBatchLink({
          transformer: SuperJSON,
          url: getUrl(),
        }),
      ],
    }),
  );
  useEffect(() => {
    if (gpuTier.tier < 2) document.documentElement.classList.add("no-gpu");
    return () => document.documentElement.classList.remove("no-gpu");
  }, [gpuTier.tier]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setStyles(getComputedStyle(document.documentElement));
    }
  }, []);
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          fontFamily: styles?.getPropertyValue("--font-lexend"),
          colorBackground: styles?.getPropertyValue("--popover"),
          colorText: styles?.getPropertyValue("--popover-foreground"),
          colorPrimary: styles?.getPropertyValue("--primary-accent"),
          colorTextSecondary: styles?.getPropertyValue("--muted-foreground"),
          colorInputBackground: styles?.getPropertyValue("--card"),
          colorInputText: styles?.getPropertyValue("--card-foreground"),
          colorDanger: styles?.getPropertyValue("--danger"),
          colorSuccess: styles?.getPropertyValue("--success"),
          borderRadius: "0.625rem",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <Scrollbars />
            {props.children}
            {shouldShowFooter && <Footer />}
          </trpc.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
