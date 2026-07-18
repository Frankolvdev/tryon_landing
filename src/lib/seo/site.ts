const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim() || FALLBACK_SITE_URL;

  try {
    const url = new URL(candidate);
    return url.toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteConfig = {
  name: "TRYON",
  productName: "TRYON AI Virtual Try-On",
  description:
    "Prueba prendas virtualmente con inteligencia artificial y visualiza nuevos estilos antes de decidir.",
  locale: "es_MX",
  language: "es-MX",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  themeColor: "#03050a",
  keywords: [
    "prueba virtual de ropa",
    "virtual try-on",
    "inteligencia artificial para moda",
    "AI fashion",
    "cambio de ropa con IA",
    "probador virtual",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}
