import type { MetadataRoute } from "next";

import { PAGES, SITE_ORIGIN } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap =>
  PAGES.map((page) => ({ url: `${SITE_ORIGIN}${page.href}` }));

export default sitemap;
