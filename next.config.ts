import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
