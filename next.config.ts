import type { NextConfig } from "next";

// Optional path prefix (e.g. "/core"). Empty = served at root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
};

export default nextConfig;
