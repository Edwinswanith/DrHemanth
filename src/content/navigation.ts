import { navItemSchema, type NavItem } from "@/lib/content/schema";
import { siteConfig } from "@/content/site";
import { z } from "zod";

/**
 * Phase C interim navigation: only /, /appointments, /privacy,
 * /accessibility, /medical-disclaimer, /cookies exist as real routes (see
 * docs/02-information-architecture.md — "Why routes are scoped by phase").
 * Header items for content that lives on the homepage today link to that
 * homepage section by id rather than to a not-yet-built page, so every nav
 * link is real and functional now. Phase E replaces the anchor hrefs below
 * with dedicated route hrefs as each page is built and cleared for
 * production per docs/04-content-verification.md.
 */
const rawNav: NavItem[] = [
  { label: "Robotic Surgery", href: "/#robotic-surgery" },
  { label: "Treatments", href: "/#treatments" },
  { label: "Robotic vs Laparoscopic", href: "/#comparison" },
  { label: "About", href: "/#about" },
  { label: "Locations", href: "/#locations" },
  { label: "Patient Information", href: "/#patient-journey" },
  { label: "Research and Media", href: "/#research" },
];

export const primaryNav: NavItem[] = z.array(navItemSchema).parse(rawNav);

export const mobilePersistentActions = {
  call: {
    label: "Call the practice",
    href: `tel:${siteConfig.primaryTelephone.value.replace(/\s+/g, "")}`,
    displayValue: siteConfig.primaryTelephone.value,
  },
  appointment: {
    label: "Request an Appointment",
    href: "/appointments",
  },
};
