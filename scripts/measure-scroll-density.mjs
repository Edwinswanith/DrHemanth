import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const args = new Map(
  process.argv
    .slice(2)
    .map((arg) => {
      const [key, ...rest] = arg.replace(/^--/, "").split("=");
      return [key, rest.join("=") || "true"];
    })
);

const baseUrl = args.get("base") ?? "http://localhost:3011";
const outDir = args.get("out") ?? path.join("audit-artifacts", "scroll-density-measurement");
const baselinePath = args.get("baseline");
const captureScreenshots = args.get("screenshots") === "true";

const inspectionViewports = [
  [320, 844],
  [360, 844],
  [390, 844],
  [430, 932],
  [480, 900],
  [600, 900],
  [640, 900],
  [720, 1000],
  [768, 1024],
  [820, 1180],
  [900, 900],
  [1024, 768],
  [1100, 800],
  [1200, 800],
  [1280, 800],
  [1366, 768],
  [1440, 900],
  [1600, 900],
  [1920, 1080],
];

const requiredScreenshotLabels = new Set([
  "390 x 844",
  "430 x 932",
  "768 x 1024",
  "1024 x 768",
  "1280 x 800",
  "1366 x 768",
  "1440 x 900",
  "1600 x 900",
  "1920 x 1080",
]);

function labelFor(width, height) {
  return `${width} x ${height}`;
}

async function measure(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const sectionLabel = (el, index) => {
      if (el.matches("header")) return "header";
      if (el.matches("footer")) return "footer";
      const declared = el.getAttribute("data-section") || el.id;
      if (declared) return declared;
      const heading = el.querySelector("h1,h2,h3");
      return (heading?.textContent || `section-${index}`).trim().replace(/\s+/g, " ").slice(0, 54);
    };
    const contentHeight = (root) => {
      const boxes = Array.from(
        root.querySelectorAll("h1,h2,h3,h4,p,li,a,button,input,select,textarea,img,iframe,video,summary,details")
      )
        .filter(visible)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
        });
      if (boxes.length === 0) return 0;
      return Math.round(Math.max(...boxes.map((box) => box.bottom)) - Math.min(...boxes.map((box) => box.top)));
    };

    const sections = Array.from(document.querySelectorAll("body > header, main > section, body > footer"))
      .map((el, index) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        const usefulContentHeight = contentHeight(el);
        return {
          index,
          id: sectionLabel(el, index),
          top: Math.round(rect.top + window.scrollY),
          bottom: Math.round(rect.bottom + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          usefulContentHeight,
          suspectedWastedHeight: Math.max(0, Math.round(rect.height) - usefulContentHeight),
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
        };
      })
      .filter((section) => section.height > 0)
      .sort((a, b) => a.top - b.top);

    const gaps = [];
    for (let index = 0; index < sections.length - 1; index += 1) {
      gaps.push({
        from: sections[index].id,
        to: sections[index + 1].id,
        gap: Math.round(sections[index + 1].top - sections[index].bottom),
      });
    }

    const overflowX = doc.scrollWidth > doc.clientWidth + 1 || body.scrollWidth > window.innerWidth + 1;
    const overflowOffenders = Array.from(document.querySelectorAll("body *"))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return null;
        if (rect.right > window.innerWidth + 1 || rect.left < -1) {
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id || "",
            className: typeof el.className === "string" ? el.className.slice(0, 140) : "",
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90),
          };
        }
        return null;
      })
      .filter(Boolean)
      .slice(0, 20);

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      scrollHeight: Math.max(doc.scrollHeight, body.scrollHeight),
      scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
      ratio: Number((Math.max(doc.scrollHeight, body.scrollHeight) / window.innerHeight).toFixed(2)),
      sections,
      gaps: gaps.sort((a, b) => b.gap - a.gap).slice(0, 8),
      overflowX,
      overflowOffenders,
      failedImages: Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src || img.alt || "unknown"),
      layoutShifts: window.__layoutShifts ?? [],
    };
  });
}

function buildSummary(results, baselineResults) {
  const lines = [
    "# Scroll Density Measurement",
    "",
    `Captured: ${new Date().toISOString()}`,
    `URL: ${baseUrl}`,
    "",
    "| Viewport | Scroll height | Ratio | Hero | Footer | Overflow | Console | Failed images |",
    "|---|---:|---:|---:|---:|---|---:|---:|",
  ];

  for (const result of results) {
    const hero = result.sections.find((section) => section.id === "hero")?.height ?? 0;
    const footer = result.sections.find((section) => section.id === "footer")?.height ?? 0;
    lines.push(
      `| ${result.viewportLabel} | ${result.scrollHeight} | ${result.ratio} | ${hero} | ${footer} | ${result.overflowX ? "Yes" : "No"} | ${result.consoleMessages.length} | ${result.failedImages.length} |`
    );
  }

  if (baselineResults) {
    lines.push("", "## Before And After", "");
    lines.push("| Viewport | Before height | After height | Reduction |");
    lines.push("|---|---:|---:|---:|");
    for (const result of results) {
      const before = baselineResults.find((entry) => entry.viewportLabel === result.viewportLabel);
      const reduction = before
        ? `${(((before.scrollHeight - result.scrollHeight) / before.scrollHeight) * 100).toFixed(1)}%`
        : "n/a";
      lines.push(`| ${result.viewportLabel} | ${before?.scrollHeight ?? "n/a"} | ${result.scrollHeight} | ${reduction} |`);
    }
  }

  lines.push("", "## Largest Section Height Sources", "");
  for (const result of results) {
    const top = [...result.sections]
      .filter((section) => section.id !== "header" && section.id !== "footer")
      .sort((a, b) => b.height - a.height)
      .slice(0, 5);
    lines.push(`### ${result.viewportLabel}`, "");
    lines.push("| Section | Height | Useful content | Suspected waste |");
    lines.push("|---|---:|---:|---:|");
    for (const section of top) {
      lines.push(
        `| ${section.id.replace(/\|/g, "/")} | ${section.height} | ${section.usefulContentHeight} | ${section.suspectedWastedHeight} |`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const [width, height] of inspectionViewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  const consoleMessages = [];
  const requestFailures = [];

  await page.addInitScript(() => {
    window.__layoutShifts = [];
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput && entry.value > 0.001) {
            window.__layoutShifts.push({ value: entry.value, startTime: entry.startTime });
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      window.__layoutShifts = [];
    }
  });

  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) {
      consoleMessages.push({ type: msg.type(), text: msg.text() });
    }
  });
  page.on("requestfailed", (request) => {
    requestFailures.push({ url: request.url(), failure: request.failure()?.errorText ?? "failed" });
  });

  await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60000 });
  const result = await measure(page);
  const viewportLabel = labelFor(width, height);

  if (captureScreenshots && requiredScreenshotLabels.has(viewportLabel)) {
    await page.screenshot({
      path: path.join(outDir, `home-${width}x${height}.png`),
      fullPage: true,
      animations: "disabled",
    });
  }

  results.push({ viewportLabel, ...result, consoleMessages, requestFailures });
  await page.close();
}

await browser.close();

let baselineResults;
if (baselinePath && fs.existsSync(baselinePath)) {
  baselineResults = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
}

fs.writeFileSync(path.join(outDir, "scroll-density-metrics.json"), JSON.stringify(results, null, 2));
fs.writeFileSync(path.join(outDir, "scroll-density-summary.md"), buildSummary(results, baselineResults));

console.table(
  results.map((result) => ({
    viewport: result.viewportLabel,
    height: result.scrollHeight,
    ratio: result.ratio,
    hero: result.sections.find((section) => section.id === "hero")?.height ?? 0,
    footer: result.sections.find((section) => section.id === "footer")?.height ?? 0,
    overflow: result.overflowX,
  }))
);
console.log(`Wrote ${path.resolve(outDir)}`);
