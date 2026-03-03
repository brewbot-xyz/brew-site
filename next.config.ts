import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        pathname: "/(emojis|avatars|embed|icons)/**/*",
        protocol: "https",
      },
    ],
    qualities: [80],
  },
};

export default nextConfig;
