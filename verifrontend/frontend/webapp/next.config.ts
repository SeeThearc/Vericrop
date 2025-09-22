import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  devIndicators: false,
  reactStrictMode: true,
};

export default nextConfig;
