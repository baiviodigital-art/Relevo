# PROGRESS · Relevo

Última actualización: 2026-11-18

## Fases
| Fase | Estado |
|---|---|
| 1. Creative Web Design | ✅ Completada y verificada (build, lint, tests, capturas escritorio/móvil) |
| 2. E-commerce (catálogo completo, configurador, filtros, carrito, flujo) | ⏳ Pendiente — base preparada |
| 3. Backend y pagos (Supabase, auth, pedidos, Stripe test, Resend) | ⏳ Pendiente — formularios ya envían con Resend si se configura |
| 4. Plataforma de gestión (área privada, admin) | ⏳ Pendiente |
| 5. Optimización y despliegue | ⏳ Pendiente |

## Fase 1 — qué incluye
- Proyecto Next.js 16 + TS + Tailwind 4, listo para Vercel. Cabeceras de seguridad básicas.
- Sistema de diseño (tokens 60/30/10, Anton + Manrope, contraste calculado) → `DESIGN_SYSTEM.md`.
- Navegación: navbar con estado activo, ocultación al hacer scroll, contador de carrito animado, menú móvil animado con Esc y bloqueo de scroll.
- Transiciones de página con cortinas (rojo + azul) y texto de marca.
- Landing: hero editorial a dos áreas (según maqueta de referencia), marquee, propuesta de valor sticky, servicios en scroll horizontal anclado,
  cómo funciona con contador sticky y línea de progreso, gestión a distancia con vista previa del panel (marcada como ilustrativa),
  pack cambio de huésped, cobertura con esquema del archipiélago, captación de profesionales, CTA final, footer con selector de idioma preparado.
- Páginas: `/como-funciona`, `/quienes-somos`, `/contacto`, `/profesionales`, `/faq` (con JSON-LD), `/catalogo` (filtro por categoría),
  `/catalogo/[slug]` (22 fichas estáticas), `/legal/*` (5 borradores), `/carrito` (persistente, estado vacío),
  `/checkout`, `/pedido/confirmacion`, `/login`, `/registro`, `/mi-cuenta` (páginas honestas "en construcción"), 404.
- Formularios de contacto y profesionales: validación cliente/servidor compartida, honeypot, tiempo mínimo, límite por IP,
  envío real con Resend o error honesto `503 not_configured`.
- SEO: metadatos por página, canonical, Open Graph + imagen OG generada, sitemap.xml, robots.txt (excluye carrito/checkout/cuenta).
- Accesibilidad: skip link, foco visible, `aria-current`, textos alternativos, `prefers-reduced-motion` respetado en todas las animaciones.
- Pruebas: 10 unitarias (`npm test`) + prueba de humo de 25 rutas (`npm run test:smoke`).

## Verificación realizada (2026-11-18)
- `npm run build` ✅ (47 páginas generadas) · `npm run lint` ✅ · `npm run typecheck` ✅ · `npm test` ✅ 10/10.
- Smoke test ✅: todas las rutas 200, `/no-existe` 404, `POST /api/contact` sin Resend → 503 `not_configured`.
- Capturas con Chromium a 1440×900 y 390×844: sin scroll horizontal, sin errores de consola, transición de página funcional.
- **No verificado**: envío real de correo (no hay claves de Resend), rendimiento Lighthouse/Core Web Vitals, lectores de pantalla reales, Safari/iOS.

## Bloqueos y riesgos
1. **Sin fotografías reales.** El contenedor de desarrollo no tiene acceso a bancos de imágenes y el proyecto no dispone de fotos con derechos.
   Se usan composiciones SVG de marca (`SceneArt`) sustituibles con `src`. La maqueta de referencia usa fotografía arquitectónica:
   **hace falta una sesión de fotos o un banco con licencia** para alcanzar ese nivel visual.
2. Datos de contacto, redes y dominio no definidos → accesos ocultos hasta configurarlos.
3. Textos legales son borradores con [PENDIENTE]; requieren revisión profesional y datos de la sociedad.
4. Equipo fundador: nombres tomados de la portada de SegmentacionClientes.pdf, sin cargos. Confirmar que pueden publicarse.
5. Límite de peticiones en memoria: protección básica en serverless; sustituir por almacenamiento compartido en fase 3.

## Decisiones técnicas
- **GSAP en lugar de GSAP + Motion**: GSAP cubre scroll, transiciones y microinteracciones; añadir Motion duplicaría funcionalidad.
- **Scroll nativo** (sin Lenis), como pide el brief.
- **Transiciones** con provider propio + `TLink` (App Router no tiene API estable de transiciones de salida).
- **Resend vía REST** sin SDK para no añadir dependencias.
- **Contenido tipado en `src/data/`** (catálogo, FAQ, legales) hasta migrar a Supabase en fase 3.
- **Precios de demostración** con `demoFrom` y etiqueta visible; disponibilidad `piloto` / `en-estudio`; flag `enabled` por servicio.
- **i18n**: `src/lib/i18n.ts` define es/en/de; solo español activo. Plan: `app/[locale]` con diccionarios revisados.
- Prioridad comercial según ModeloValidad: no residentes, sur de Gran Canaria, vender el resultado (coordinación + prueba + incidencias).

## Siguiente paso (fase 2)
- Configurador por servicio (isla, municipio, dirección, tipo, superficie en 5 tramos, habitaciones, baños, fecha, franja, extras, observaciones).
- Motor de precios configurable (`lib/pricing.ts`) con tests.
- Buscador y filtros (categoría, ubicación, tipo de vivienda).
- Carrito completo + carrito lateral, códigos promocionales configurados, estados de carga/error.
