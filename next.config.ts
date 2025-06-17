import type { NextConfig } from "next";

import env from "./env";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        pathname: "/**/*",
        protocol: "https",
      },
      {
        hostname: "assets.aceternity.com",
        pathname: "/demos/*",
        protocol: "https",
      },
    ],
  },
  env: Object.entries(env).reduce((acc, [key, value]) => {
    if (key.startsWith("__") || key.startsWith("NODE_") || key === "NEXT_RUNTIME") return acc;
    return {
      ...acc,
      [key]: `${value}`,
    };
  }, {}),
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
