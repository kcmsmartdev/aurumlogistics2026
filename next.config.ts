import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:["192.168.1.16","192.168.14.16:3000"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
