import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { legalDocs } from "@/data/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/catalogo", "/como-funciona", "/quienes-somos", "/contacto", "/profesionales", "/faq"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.filter((s) => s.enabled).map((s) => ({ url: `${site.url}/catalogo/${s.slug}`, lastModified: now, priority: 0.6 })),
    ...legalDocs.map((d) => ({ url: `${site.url}/legal/${d.slug}`, lastModified: now, priority: 0.2 })),
  ];
}
