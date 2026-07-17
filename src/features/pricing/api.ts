import { apiRequest } from "@/lib/api/client";
import type {
  SubscriptionPlan,
  SubscriptionPlanListResponse,
} from "@/features/pricing/types";

const PUBLIC_PLANS_ENDPOINT = "/api/v1/subscription-plans/public";

function isPlan(value: unknown): value is SubscriptionPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Partial<SubscriptionPlan>;
  return (
    typeof plan.id === "number" &&
    typeof plan.key === "string" &&
    typeof plan.name === "string" &&
    typeof plan.currency === "string" &&
    Array.isArray(plan.features)
  );
}

function normalizePlans(payload: unknown): SubscriptionPlan[] {
  if (Array.isArray(payload)) return payload.filter(isPlan);
  if (!payload || typeof payload !== "object") return [];

  const response = payload as Partial<SubscriptionPlanListResponse>;
  return Array.isArray(response.items) ? response.items.filter(isPlan) : [];
}

export async function getPublicSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const payload = await apiRequest<unknown>(PUBLIC_PLANS_ENDPOINT, {
    method: "GET",
    cache: "no-store",
  });

  return normalizePlans(payload)
    .filter((plan) => plan.is_public && plan.is_active)
    .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
}
