// Shared helper for e2e tests that submit the appointment form — see the
// comment in appointment-request.spec.ts for why this is necessary.
export function fakeClientIp(): string {
  const n = () => Math.floor(Math.random() * 255);
  return `203.0.${n()}.${n()}`;
}
