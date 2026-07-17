import type { ApiErrorPayload } from "@/types/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getApiErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;

  const data = payload as ApiErrorPayload;
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  if (typeof data.detail === "string") return data.detail;

  if (Array.isArray(data.detail)) {
    const messages = data.detail
      .map((entry) => entry?.msg)
      .filter((message): message is string => Boolean(message));
    if (messages.length > 0) return messages.join(". ");
  }

  return fallback;
}
