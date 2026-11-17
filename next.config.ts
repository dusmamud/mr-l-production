import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site deploys to Cloudflare Pages by direct upload
  // (wrangler pages deploy out/), like Dus's other sites. The site is fully
  // static content — no server actions, no dynamic data — so nothing is lost.
  output: "export",
  images: {
    // next/image optimisation needs a server; with a static export the
    // generated JPGs are served as-is.
    unoptimized: true,
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
