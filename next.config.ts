import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
