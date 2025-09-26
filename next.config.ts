import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
      images: {
        unoptimized: true, // Optional: if you use Image component, set unoptimized to true for static export
      },
      basePath: process.env.NODE_ENV === 'production' ? '/oss_catalog' : '', // Important for correct pathing on GitHub Pages
      assetPrefix: process.env.NODE_ENV === 'production' ? '/oss_catalog' : '', // Important for correct pathing on GitHub Pages
};

export default nextConfig;
