import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// A plain typographic monogram, not a real practice logo (none has been
// supplied/approved yet — see docs/08-design-system.md on imagery). Replace
// with the practice's approved logo mark as soon as one exists.
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
          background: "#101a2e",
          color: "#faf8f4",
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
