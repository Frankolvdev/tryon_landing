export type ApiHealth = {
  status?: string;
  message?: string;
  [key: string]: unknown;
};

export type ApiErrorPayload = {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
  error?: string;
};
