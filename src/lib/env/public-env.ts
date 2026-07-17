const DEFAULT_API_URL = "http://127.0.0.1:8001";
const DEFAULT_TIMEOUT_MS = 10_000;

function normalizeApiUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function parseTimeout(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1_000 ? parsed : DEFAULT_TIMEOUT_MS;
}

export const publicEnv = Object.freeze({
  apiBaseUrl: normalizeApiUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_URL,
  ),
  apiTimeoutMs: parseTimeout(process.env.NEXT_PUBLIC_API_TIMEOUT_MS),
});
