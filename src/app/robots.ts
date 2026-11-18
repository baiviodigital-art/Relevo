import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/carrito", "/checkout", "/pedido/", "/mi-cuenta", "/login", "/registro"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
