import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/lib/site";

const robots = (): MetadataRoute.Robots => ({
  rules: { allow: "/", userAgent: "*" },
  sitemap: `${SITE_ORIGIN}/sitemap.xml`,
});

export default robots;
