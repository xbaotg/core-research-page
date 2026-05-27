import type { NextConfig } from "next";

// Optional path prefix (e.g. "/core"). Empty = served at root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  // Dev-only: by default Next 16 blocks cross-origin requests to /_next dev
  // resources (HMR + client chunks). When the dev server is opened from another
  // machine on the LAN (phone, laptop), those assets are blocked and the client
  // never hydrates — every button looks dead. Allow private LAN ranges in dev.
  // (Ignored by `next build` / `next start`; no effect in production.)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*"],
  async redirects() {
    // Old links under the former "/core" base path → root.
    // (Only when the app is NOT served under a base path.)
    return basePath
      ? []
      : [
          { source: "/core", destination: "/", permanent: true },
          { source: "/core/:path*", destination: "/:path*", permanent: true },
        ];
  },
};

export default nextConfig;
