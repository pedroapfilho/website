import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/lib/site";

const ROUTES = ["/", "/resume", "/side", "/uses"];

const sitemap = (): MetadataRoute.Sitemap =>
  ROUTES.map((route) => ({ url: `${SITE_ORIGIN}${route}` }));

export default sitemap;
