import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**", // Matches all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
