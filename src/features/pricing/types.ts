export type BillingInterval = "day" | "week" | "month" | "year" | string;

export type SubscriptionPlan = {
  id: number;
  key: string;
  name: string;
  description: string | null;
  billing_interval: BillingInterval;
  currency: string;
  price_amount: string | number;
  tokens_per_period: number;
  max_generations_per_period: number | null;
  priority: number;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  stripe_configured: boolean;
  features: string[];
  metadata: Record<string, unknown>;
  is_public: boolean;
  is_active: boolean;
  sort_order: number;
};

export type SubscriptionPlanListResponse = {
  items: SubscriptionPlan[];
  total: number;
  skip: number;
  limit: number;
};
