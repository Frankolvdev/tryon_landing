import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/cookies", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/acceptable-use", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/18-plus", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
