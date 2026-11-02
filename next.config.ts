import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:["192.168.1.14","192.168.14.14:3000"],
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
