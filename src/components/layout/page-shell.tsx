import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobilePersistentActions } from "@/components/layout/mobile-navigation";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <nav aria-label="Skip links">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
      </nav>
      <SiteHeader />
      <main id="main-content">
        {children}
      </main>
      <SiteFooter />
      <MobilePersistentActions />
    </>
  );
}
