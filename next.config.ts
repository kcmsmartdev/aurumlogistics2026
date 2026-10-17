import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:["192.168.1.211","192.168.1.211:3000"],
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
