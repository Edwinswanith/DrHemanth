import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    rules: {
      userAgent: "*",
      // Staging/preview deployments are never indexed — see
      // docs/15-launch-checklist.md ("staging noindex confirmed").
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? "/api/" : "/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
