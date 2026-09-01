#!/usr/bin/env node
/**
 * Turns docs/raw-crawl/crawl-results.json (produced by audit-crawl.mjs) into
 * docs/03-content-inventory.csv (raw per-URL inventory) and
 * docs/06-seo-migration-map.csv (migration decision per URL), applying the
 * classification rules below. Every rule is stated explicitly here so the
 * mapping is reviewable and re-runnable, not a one-off manual judgement call.
 *
 * Classification is evidence-based:
 *  - "merge"/"redirect" targets follow docs/02-information-architecture.md.
 *  - Medical-content classification never assumes old copy is safe to reuse
 *    (see .claude/rules/medical-content.md) — the default for old clinical
 *    prose is "requires-clinical-rewrite" unless a page is purely factual
 *    (legal, location address) or purely navigational.
 *  - "investigate" is used wherever consent, currency, or source-platform
 *    cannot be determined from a plain HTTP fetch (testimonials, hours).
 *
 * Usage: node scripts/build-migration-map.mjs
 */

import { readFile, writeFile } from "node:fs/promises";

const RAW = JSON.parse(await readFile("docs/raw-crawl/crawl-results.json", "utf8"));

// --- classification rules, evaluated in order, first match wins ---
const RULES = [
  { test: (u) => u === "https://www.keyholesurgeon.co.uk/", decision: "keep", dest: "/", medical: "reusable-after-editing",
    note: "Homepage. Full rebuild of layout/content; canonical positioning pending client approval (docs/04-content-verification.md)." },

  { test: (u) => /general-appointment-/.test(u), decision: "redirect", dest: "/appointments", medical: "n/a",
    note: "Old appointment page replaced by the new appointment request flow (Phase D)." },

  { test: (u) => /dr-hemant-sheth-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/about", medical: "requires-doctor-confirmation",
    note: "Biography. GMC number, exact title, 'Clinical Professor' claim, current NHS role all unverified — see evidence-hierarchy table." },

  { test: (u) => /contact-us-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/contact", medical: "reusable-after-editing",
    note: "Contact hub; content merges into /contact and /locations." },

  { test: (u) => /^https:\/\/www\.keyholesurgeon\.co\.uk\/services-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/treatments", medical: "reusable-after-editing",
    note: "Services overview replaced by the new Treatments hub." },

  { test: (u) => /patient-education-videos-general-laparoscopic-surgeon/.test(u), decision: "investigate", dest: "/videos-media", medical: "requires-doctor-confirmation",
    note: "Video licensing/hosting rights and current relevance of each embedded video are unverified." },

  { test: (u) => /patient-forms-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/patient-information/forms", medical: "requires-doctor-confirmation",
    note: "Confirm forms are current before republishing as downloads." },

  { test: (u) => /first-visit-guide-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/patient-information/preparing-for-your-appointment", medical: "reusable-after-editing", note: "" },

  { test: (u) => /post-op-instructions-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/patient-information/post-operative-guidance", medical: "requires-clinical-rewrite",
    note: "CONFIRMED DEFECT: contains orthopaedic boilerplate (operated extremity elevation, joint motion, finger/toe colour) inapplicable to abdominal/laparoscopic surgery. Do not migrate content verbatim." },

  { test: (u) => /insurance-info-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/patient-information/insurance-and-fees", medical: "requires-doctor-confirmation", note: "Fees/insurer list needs current confirmation." },

  { test: (u) => /patient-reviews-testimonials-f14143\/?(\?.*)?$/.test(u), decision: "investigate", dest: "/patient-reviews", medical: "requires-doctor-confirmation",
    note: "3 named testimonials shown; consent/attribution/source-platform (possibly I Want Great Care) unconfirmed." },

  { test: (u) => /^https:\/\/www\.keyholesurgeon\.co\.uk\/patient-survey-f14143/.test(u), decision: "investigate", dest: "/patient-reviews", medical: "requires-doctor-confirmation",
    note: "Individual testimonial permalink. Whether this originates from a verifiable third-party platform (e.g. IWGC) or an unverifiable internal form determines merge vs. retire — needs client input." },

  { test: (u) => /useful-links-general-laparoscopic-surgeon/.test(u), decision: "merge", dest: "/patient-information", medical: "reusable-after-editing", note: "Thin page; fold into Patient Information as a short links section." },

  { test: (u) => /research-and-publications-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/research-publications", medical: "requires-doctor-confirmation", note: "Publication list needs currency/accuracy check against author's actual output." },

  // location pages
  { test: (u) => /spire-bushey-hospital-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/locations/spire-bushey", medical: "requires-doctor-confirmation", note: "Hours/active-practice status unverified; no parking/transport/accessibility info currently." },
  { test: (u) => /the-clementine-churchill-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/locations/clementine-churchill-harrow", medical: "requires-doctor-confirmation", note: "Same as above." },
  { test: (u) => /the-waterfront-business-park-general-laparoscopic-surgeon/.test(u), decision: "redirect", dest: "/locations/wellington-elstree", medical: "requires-doctor-confirmation", note: "Same as above; page title says Wellington Hospital Elstree Waterfront despite URL slug." },

  // legal / system
  { test: (u) => /\/disclaimer\/?$/.test(u), decision: "redirect", dest: "/medical-disclaimer", medical: "reusable-after-editing", note: "Rewrite to current UK-GDPR/GMC-appropriate standard, don't copy verbatim." },
  { test: (u) => /\/privacy\/?$/.test(u), decision: "redirect", dest: "/privacy", medical: "reusable-after-editing", note: "Full rewrite required — see docs/decisions and Phase B legal gate; old text predates current PECR/UK GDPR expectations." },
  { test: (u) => /\/sitemap\/?$/.test(u), decision: "retire", dest: "", medical: "n/a", note: "Superseded by XML sitemap + real site navigation; no HTML sitemap page in new IA." },
  { test: (u) => /feedback-general-laparoscopic-surgeon/.test(u), decision: "retire", dest: "", medical: "n/a", note: "Generic feedback-form page superseded by direct contact/appointment CTA." },
  { test: (u) => /\/tell-a-friend\/?$/.test(u), decision: "retire", dest: "", medical: "n/a", note: "Legacy engagement gimmick, no modern equivalent needed." },
  { test: (u) => /\/facebook\/?$/.test(u), decision: "retire", dest: "", medical: "n/a", note: "Interstitial wrapper page; footer links directly to social profiles instead." },
  { test: (u) => /patient-resources-general-laparoscopic-surgeon/.test(u), decision: "merge", dest: "/patient-information", medical: "reusable-after-editing", note: "" },
  { test: (u) => /\/ypo-showcase\/?$/.test(u), decision: "retire", dest: "", medical: "n/a", note: "CONFIRMED junk: third-party platform vendor showcase page (~17,500 words, ~2,000 external links/images) with no relevance to this practice." },

  // hernia-cluster near-duplicates -> merge into a small set of canonical hernia pages
  { test: (u) => /(laparoscopic-hernia-repair-tep-and-tapp|hernia-surgery-procedures|hernia-repair-general|hernia-treatments-general|open-inguinal-hernia-repair|laparoscopic-inguinal-hernia-repair|femoral-hernia-repair|umbilical-hernia-repair-general|incisional-hernia-repair-general|surgery-for-diaphragmatic-hernias)/.test(u),
    decision: "merge", dest: "/treatments/hernia-surgery", medical: "requires-clinical-rewrite",
    note: "One of 10 overlapping hernia-repair URLs on the old site; consolidate into a single well-structured hernia-surgery treatment page (with sub-sections, not 10 near-duplicate pages)." },

  { test: (u) => /(hernia-general-laparoscopic|inguinal-hernia-general|hiatal-hernia-general|paraesophageal-hernia-general|umbilical-hernia-general|incisional-hernia-general)/.test(u),
    decision: "merge", dest: "/treatments/hernia-surgery", medical: "requires-clinical-rewrite",
    note: "Condition-side duplicate of the hernia-repair cluster above; same consolidation target." },

  // upper GI / anti-reflux cluster
  { test: (u) => /(gastroesophageal-reflux-disease-gerd|anti-reflux-surgery-general|hiatal-hernia)/.test(u), decision: "merge", dest: "/treatments/anti-reflux-surgery", medical: "requires-clinical-rewrite", note: "" },
  { test: (u) => /(upper-gi-endoscopy-general|upper-gi-procedures-general|upper-gastrointestinal-disease|achalasia-general)/.test(u), decision: "merge", dest: "/treatments/upper-gi-endoscopy", medical: "requires-clinical-rewrite", note: "" },

  // gallbladder / HPB cluster
  { test: (u) => /(laparoscopic-cholecystectomy-general|gallbladder-surgery-general|open-cholecystectomy-general|gallbladder-disease-general|gallstones-general)/.test(u), decision: "merge", dest: "/treatments/gallbladder-surgery", medical: "requires-clinical-rewrite", note: "" },
  { test: (u) => /(laparoscopic-common-bile-duct-exploration|laparoscopic-cbd-exploration|choledocholithiasis-general|endoscopic-retrograde-cholangiopancreatography)/.test(u), decision: "merge", dest: "/treatments/bile-duct-exploration", medical: "requires-clinical-rewrite", note: "" },
  { test: (u) => /(hepatobiliary-disease-general|treatments-for-hpb-disorders|biliary-tract-cancer|investigation-of-abnormal-liver-enzymes|liver-disease-general|liver-masses-general|liver-cancer-general|laparoscopic-liver-resection|splenectomy-general)/.test(u), decision: "merge", dest: "/treatments/liver-and-spleen-surgery", medical: "requires-clinical-rewrite", note: "" },

  // appendicectomy
  { test: (u) => /(appendectomy-general|appendicectomy-procedure)/.test(u), decision: "merge", dest: "/treatments/appendicectomy", medical: "requires-clinical-rewrite", note: "" },

  // general/minor procedures + skin/other -> patient information or a general-surgery page, low priority
  { test: (u) => /(excision-of-skin-and-subcutaneous-tissue-lesions|incision-and-drainage-of-abscess|drainage-of-anal-or-perirectal-abscess|lumps-and-bumps-general|skin-cancer-mole-checks|anorectal-abscess-general|pilonidal-sinus-general)/.test(u),
    decision: "investigate", dest: "/treatments", medical: "requires-doctor-confirmation",
    note: "Minor/general-surgery procedures outside the primary UGI/HPB/hernia/robotic positioning — confirm with client whether these remain part of the offered service line before building a page." },

  // remaining generic gastroenterology / symptom stub pages -> merge into a smaller set of condition pages
  { test: (u) => /(conditions-gastroenterology-gastrointestinal-general|general-conditions-laparoscopic|gastroenterology-gastrointestinal-general|gastroenterology-gastrointestinal-procedures|acute-abdominal-pain-general|gastric-disease-general|indigestion-general|belching-and-bloating-general|prevention-of-gastrointestinal-diseases|general-procedures-laparoscopic|general-surgery-laparoscopic|laparoscopic-surgery-general)/.test(u),
    decision: "merge", dest: "/treatments", medical: "requires-clinical-rewrite",
    note: "Thin, templated symptom/condition stub — meta description follows the same formulaic pattern across dozens of old-site pages, a content-mill signal, not written specifically for this practice. Consolidate rather than reuse." },
];

const DEFAULT = { decision: "investigate", dest: "", medical: "requires-doctor-confirmation", note: "No explicit rule matched — needs manual classification before Phase E." };

function classify(url) {
  const rule = RULES.find((r) => r.test(url));
  return rule ?? DEFAULT;
}

const inventoryHeader = [
  "url", "discoverySource", "httpStatus", "pageType", "title", "metaDescription", "h1", "canonical",
  "indexable", "wordCount", "internalLinkCount", "externalLinkCount", "imageCount", "imagesWithoutAlt",
  "hasJsonLd", "jsonLdTypes", "structuredDataNote",
];

const migrationHeader = [
  "existingUrl", "httpStatus", "recommendedDestination", "redirectRequired", "migrationDecision",
  "medicalReviewClassification", "searchTraffic", "backlinks", "verificationStatus", "notes",
];

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const inventoryRows = [];
const migrationRows = [];

for (const r of RAW) {
  const c = classify(r.url);
  const structuredDataNote = r.hasJsonLd && r.jsonLdTypes?.includes("unparsed")
    ? "JSON-LD present but did not parse as valid JSON on at least one block — technical defect to fix in rebuild"
    : r.hasJsonLd ? `Parses as: ${r.jsonLdTypes}` : "None present";

  inventoryRows.push([
    r.url, r.discoverySource, r.httpStatus,
    c.dest.includes("/locations/") ? "location" : c.dest === "/about" ? "bio" : c.dest.startsWith("/treatments") ? "service/condition" : c.dest === "/patient-reviews" ? "testimonial" : c.dest.startsWith("/patient-information") ? "patient-info" : ["/privacy", "/medical-disclaimer"].includes(c.dest) ? "legal" : "other",
    r.title, r.metaDescription, r.h1, r.canonical || "(none set)", r.indexable, r.wordCount,
    r.internalLinkCount, r.externalLinkCount, r.imageCount, r.imagesWithoutAlt, r.hasJsonLd, r.jsonLdTypes, structuredDataNote,
  ].map(csvEscape).join(","));

  migrationRows.push([
    r.url, r.httpStatus, c.dest || "(none — retire)", c.decision === "redirect" || c.decision === "merge" ? "yes (301)" : c.decision === "retire" ? "yes (410)" : "n/a — investigate first",
    c.decision, c.medical, "not available", "not available",
    c.decision === "investigate" || c.medical === "requires-doctor-confirmation" || c.medical === "requires-clinical-rewrite" ? "pending" : "n/a",
    c.note,
  ].map(csvEscape).join(","));
}

await writeFile("docs/03-content-inventory.csv", [inventoryHeader.join(","), ...inventoryRows].join("\n"));
await writeFile("docs/06-seo-migration-map.csv", [migrationHeader.join(","), ...migrationRows].join("\n"));

const counts = migrationRows.reduce((acc, row) => {
  const decision = row.split(",")[4];
  acc[decision] = (acc[decision] ?? 0) + 1;
  return acc;
}, {});
console.log(`Wrote ${inventoryRows.length} rows to docs/03-content-inventory.csv`);
console.log(`Wrote ${migrationRows.length} rows to docs/06-seo-migration-map.csv`);
console.log("Decision counts:", counts);
