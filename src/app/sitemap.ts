import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

/**
 * Only real, indexable, production-ready routes are listed — see
 * docs/02-information-architecture.md ("Why routes are scoped by phase").
 * /appointments/confirmation is deliberately excluded (noindex system
 * page, see its own metadata). Extend this list as Phase E routes clear
 * verification and land in src/app/.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/appointments", "/privacy", "/accessibility", "/medical-disclaimer"];

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
  }));
}
