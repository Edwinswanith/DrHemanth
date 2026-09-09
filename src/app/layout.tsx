import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { siteConfig } from "@/content/site";
import { PageShell } from "@/components/layout/page-shell";
import "@/styles/globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Consultant Surgeon`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sourceSerif.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
