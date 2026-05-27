import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/weerbaarheidsscan",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
