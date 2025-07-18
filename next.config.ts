import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["m.media-amazon.com"],
  },
  experimental: {
    typedRoutes: false,
  },
};

module.exports = nextConfig;
