import { apiRequest } from "@/lib/api/client";
import type { ApiHealth } from "@/types/api";

export function getBackendHealth(): Promise<ApiHealth> {
  return apiRequest<ApiHealth>("/health", {
    method: "GET",
    cache: "no-store",
  });
}
