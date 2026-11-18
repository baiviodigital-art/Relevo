/**
 * Configuración pública del sitio. Los datos de contacto proceden de variables de entorno:
 * si no están definidas, la interfaz oculta los accesos correspondientes en lugar de
 * mostrar enlaces que no llevan a ninguna parte.
 */
export const site = {
  name: "Relevo",
  tagline: "Servicios para viviendas vacacionales en Canarias",
  description:
    "Limpieza, mantenimiento, check-in y preparación de tu vivienda vacacional en Canarias, coordinados desde una única plataforma. Lanzamiento piloto propuesto en el sur de Gran Canaria.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "es_ES",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  },
  /** Redes sociales: se muestran solo las que tengan URL. */
  social: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
  ],
} as const;

export function whatsappHref(text?: string) {
  if (!site.contact.whatsapp) return "";
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${q}`;
}

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Contactar", href: "/contacto" },
] as const;

export const legalNav = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Condiciones de contratación", href: "/legal/condiciones" },
  { label: "Cancelación y reembolsos", href: "/legal/cancelacion" },
] as const;
