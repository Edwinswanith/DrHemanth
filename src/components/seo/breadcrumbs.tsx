import Link from "next/link";
import type { BreadcrumbItem } from "@/types/seo";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/content/site";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-(length:--text-small) text-ink-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className="text-ink-500">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-ink-800">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-ink-900 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <StructuredData data={jsonLd} />
    </nav>
  );
}
