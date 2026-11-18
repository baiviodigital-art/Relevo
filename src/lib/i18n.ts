/**
 * Preparación multidioma. Hoy solo existe español; inglés y alemán están previstos.
 * Plan: mover textos a diccionarios por locale y servir rutas /en y /de con
 * `app/[locale]` cuando haya traducciones revisadas (no automáticas).
 */
export const locales = [
  { code: "es", label: "ES", name: "Español", available: true },
  { code: "en", label: "EN", name: "English", available: false },
  { code: "de", label: "DE", name: "Deutsch", available: false },
] as const;

export type Locale = (typeof locales)[number]["code"];
export const defaultLocale: Locale = "es";
