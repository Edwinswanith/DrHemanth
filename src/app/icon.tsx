import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// A plain typographic monogram, not a real practice logo (none has been
// supplied/approved yet — see docs/08-design-system.md on imagery). Replace
// with the practice's approved logo mark as soon as one exists.
//
// Literal hex values below (matching --color-ink-950 / --color-page) are a
// deliberate, documented exception to "no hardcoded colours": next/og's
// ImageResponse renders via Satori to a static image outside the DOM/CSSOM,
// so it cannot resolve CSS custom properties from tokens.css.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#142b3a",
          color: "#f8f9fb",
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "serif",
        }}
      >
        HS
      </div>
    ),
    size
  );
}
