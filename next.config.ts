import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ncclone",
  images: { unoptimized: true },
};

export default nextConfig;
