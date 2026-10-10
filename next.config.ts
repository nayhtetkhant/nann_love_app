import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,

  // `data/*.json` is read from disk in a Server Component, so make sure it is
  // always bundled into the deployment (Vercel) even if it can't be traced.
  outputFileTracingIncludes: {
    "/": ["./data/**/*"],
  },

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
