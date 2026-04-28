import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.7.7",
        port: "5005",
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
