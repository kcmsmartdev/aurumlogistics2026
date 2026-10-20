import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  allowedDevOrigins:["192.168.14.211","192.168.14.211:3000"],
=======
  allowedDevOrigins:["192.168.1.16","192.168.1.16:3000"],
>>>>>>> 2295864 (se agrega section de hero y nosotros)
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
