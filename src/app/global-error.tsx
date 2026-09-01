"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[global-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="en-GB">
      <body>
        <main style={{ padding: "3rem", fontFamily: "system-ui, sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>Please try again, or call the practice directly.</p>
          <button onClick={() => reset()} type="button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
