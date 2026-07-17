import { ApiError, getApiErrorMessage } from "@/lib/api/api-error";
import { publicEnv } from "@/lib/env/public-env";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | null;
  timeoutMs?: number;
};

function createUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${publicEnv.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? publicEnv.apiTimeoutMs,
  );

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  let requestBody = options.body;
  if (requestBody && typeof requestBody === "object" && !(requestBody instanceof FormData)) {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(requestBody);
  }

  try {
    const response = await fetch(createUrl(path), {
      ...options,
      body: requestBody as BodyInit | null | undefined,
      headers,
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new ApiError(
        getApiErrorMessage(payload, `La solicitud falló (${response.status}).`),
        response.status,
        payload,
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("El backend tardó demasiado en responder.", 408);
    }
    throw new ApiError("No fue posible conectar con el backend.", 0, error);
  } finally {
    clearTimeout(timeoutId);
  }
}
