import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // no "N" badge in the corner while developing
  devIndicators: false,
  // let a phone on the same Wi-Fi load the dev server without cross-origin errors
  allowedDevOrigins: ["192.168.1.9", "172.20.10.2", "*.local"],
};

export default nextConfig;
