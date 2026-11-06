import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/upncomer",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
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
