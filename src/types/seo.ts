export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function absoluteUrl(path: string, siteUrl: string): string {
  return new URL(path, siteUrl).toString();
}
