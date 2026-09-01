import { test, expect } from "@playwright/test";
import { fakeClientIp } from "./test-utils";

// The DB-backed rate limiter (src/features/appointments/appointment-rate-limit.ts)
// buckets by client IP. Real browser/API-context traffic to a local/preview
// server carries no X-Forwarded-For, so every test would otherwise land in
// one shared "unknown" bucket and trip the limiter after a handful of
// submissions across parallel projects. Each test fakes a distinct,
// unique IP via that header to get its own bucket — this exercises the
// real rate-limiting code path per "client" the way production traffic
// (which does carry X-Forwarded-For) would, rather than weakening it.

test.describe("Appointment request", () => {
  test("full end-to-end submission succeeds and shows a reference on the confirmation page", async ({
    page,
    context,
  }) => {
    await context.setExtraHTTPHeaders({ "x-forwarded-for": fakeClientIp() });
    await page.goto("/appointments");

    await page.getByLabel("Full name").fill("Playwright Test Patient");
    await page.getByLabel("Telephone").fill("07123456789");
    await page.getByLabel("Email address").fill(`playwright-${Date.now()}@example.com`);
    await page.getByLabel("Preferred location").selectOption("no-preference");
    await page.getByLabel("Preferred contact method").selectOption("email");
    await page.getByLabel("Broad availability").selectOption("flexible");
    await page.getByLabel(/I have read and understood/).check();

    await page.getByRole("button", { name: "Request an Appointment" }).click();

    await expect(page).toHaveURL(/\/appointments\/confirmation\?ref=HS-/);
    await expect(page.getByRole("heading", { name: "Request received" })).toBeVisible();
    await expect(page.getByText(/Reference: HS-\d{8}-[A-F0-9]{8}/)).toBeVisible();
    await expect(page.getByText("it is not a confirmed appointment")).toBeVisible();
  });

  test("client-side required validation blocks submission with empty fields", async ({ page }) => {
    await page.goto("/appointments");
    await page.getByRole("button", { name: "Request an Appointment" }).click();
    // Native HTML5 required-field validation keeps us on the same page.
    await expect(page).toHaveURL(/\/appointments$/);
  });

  test("server rejects an invalid email even if a client somehow bypassed HTML validation", async ({ request }) => {
    const response = await request.post("/api/appointment-request", {
      headers: { "x-forwarded-for": fakeClientIp() },
      data: {
        fullName: "Test Patient",
        telephone: "07123456789",
        email: "not-an-email",
        preferredLocation: "no-preference",
        preferredContactMethod: "email",
        broadAvailability: "flexible",
        privacyAcknowledged: true,
        companyWebsite: "",
        submissionToken: crypto.randomUUID(),
      },
    });
    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.fieldErrors.email).toBeTruthy();
  });

  test("resubmitting the same client submission token is idempotent (no duplicate acknowledgement)", async ({
    request,
  }) => {
    const submissionToken = crypto.randomUUID();
    const headers = { "x-forwarded-for": fakeClientIp() };
    const payload = {
      fullName: "Idempotency E2E",
      telephone: "07123456789",
      email: "idempotency-e2e@example.com",
      preferredLocation: "no-preference",
      preferredContactMethod: "email",
      broadAvailability: "flexible",
      privacyAcknowledged: true,
      companyWebsite: "",
      submissionToken,
    };

    const first = await request.post("/api/appointment-request", { headers, data: payload });
    const second = await request.post("/api/appointment-request", { headers, data: payload });

    expect(first.status()).toBe(201);
    expect(second.status()).toBe(200);
    const firstBody = await first.json();
    const secondBody = await second.json();
    expect(secondBody.outcome).toBe("duplicate");
    expect(secondBody.reference).toBe(firstBody.reference);
  });

  test("the recipient email address is never exposed in client-side page source", async ({ page }) => {
    await page.goto("/appointments");
    const html = await page.content();
    // No production notification recipient is configured in this
    // environment (NOTIFICATION_PROVIDER=dev — see
    // src/lib/email/notification-provider.ts), so this also guards against
    // ever hardcoding one into a client-rendered page in the future.
    expect(html).not.toMatch(/[\w.+-]+@(?!example\.com)[\w-]+\.[a-z]{2,}/i);
  });
});
