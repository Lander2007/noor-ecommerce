import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
    qualities: [75, 80, 85],
  },
  allowedDevOrigins: ["**.com", "**.site", "**.app", "**.dev", "**.io", "**.net", "**.run", "**.org", "**.cloud"],
};

export default nextConfig;
