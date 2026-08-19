import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.{ts,tsx}": {
        condition: {
          all: [
            { not: "foreign" },
            // oxlint-disable-next-line eslint/require-unicode-regexp -- Turbopack rejects RegExp flags.
            { content: /[Zz]od/ },
          ],
        },
        loaders: ["zod-compiler/turbopack"],
      },
    },
  },
};

export default nextConfig;
