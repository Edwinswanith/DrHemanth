import { navItemSchema, type NavItem } from "@/lib/content/schema";
import { siteConfig } from "@/content/site";
import { canRenderFact } from "@/lib/content/publication";
import { z } from "zod";

/**
 * Header links point to real routes where Phase E pages exist, and to
 * homepage anchors where the content still lives only on the homepage.
 */
const rawNav: NavItem[] = [
  { label: "Robotic Surgery", href: "/#robotic-surgery" },
  { label: "Treatments", href: "/treatments" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/#about" },
  { label: "Patient Information", href: "/#patient-journey" },
];

export const primaryNav: NavItem[] = z.array(navItemSchema).parse(rawNav);

const publicTelephone = canRenderFact(siteConfig.primaryTelephone)
  ? {
      label: "Call the practice",
      href: `tel:${siteConfig.primaryTelephone.value.replace(/\s+/g, "")}`,
      displayValue: siteConfig.primaryTelephone.value,
    }
  : null;

export const mobilePersistentActions = {
  call: publicTelephone,
  appointment: {
    label: "Request an Appointment",
    href: "/appointments",
  },
};
