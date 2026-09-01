import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "docs/raw-crawl/**",
      "coverage/**",
    ],
  },
  ...nextCoreWebVitals,
];

export default config;
