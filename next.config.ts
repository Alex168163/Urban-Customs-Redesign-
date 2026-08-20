import type { NextConfig } from "next";
import { redirects } from "./content/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // The old WordPress site serves trailing-slash URLs. Match it rather than
  // change URL shape during a rebuild.
  trailingSlash: true,

  images: {
    // Source photos are large, unoptimized JPG/PNG. These are served as
    // WebP/AVIF at the size actually requested.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 240, 320, 420],
  },

  async redirects() {
    return redirects;
  },

  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
