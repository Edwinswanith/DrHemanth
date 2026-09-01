import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobilePersistentActions } from "@/components/layout/mobile-navigation";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      {/* Bottom padding on mobile reserves space for the persistent action
          bar so it never overlaps footer content. */}
      <main id="main-content" className="pb-20 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobilePersistentActions />
    </>
  );
}
