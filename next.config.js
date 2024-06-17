/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

const withBundleAnalyer = require("@next/bundle-analyzer")({
  enabled: false,
  // process.env.ANALYZE === "true" || process.env.ANALYZE,
});

module.exports = withBundleAnalyer(nextConfig);
