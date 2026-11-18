# CLAUDE.md — Instrucciones permanentes del proyecto Relevo

## Regla prioritaria
- **Nunca usar Claude Artifacts** ni maquetas dentro de Claude. Todo se desarrolla como código real en este repositorio,
  desplegable en Vercel, con commits en ramas y pull requests.

## Qué es Relevo
Plataforma de contratación y coordinación de servicios (limpieza, mantenimiento, check-in/out, lavandería, reposición,
piscina y jardinería) para viviendas vacacionales en Canarias. **No** alquila ni comercializa alojamientos.
Lanzamiento piloto propuesto en el sur de Gran Canaria. Cliente prioritario: propietarios no residentes con pocas viviendas.

Fuentes de negocio (fuera del repo): BusinessModelCanva.pdf, ModeloValidad.pdf, PasarelaDePago.pdf, SegmentacionClientes.pdf.
Si hay contradicción, **manda ModeloValidad** sobre el Canvas.

## Reglas de contenido (no negociables)
- No inventar: testimonios, estadísticas, cobertura, disponibilidad, tarifas definitivas, cargos o biografías del equipo,
  datos fiscales/registrales.
- Precios = "de demostración", siempre etiquetados. IGIC indicado aparte.
- Garantías siempre condicionadas (cobertura, horario, antelación). No prometer trabajo constante a profesionales.
- Integraciones no activas (Airbnb/Booking, pagos, panel) se marcan como "en desarrollo" o "futuro".
- Formularios: nunca simular envíos correctos. Sin integración configurada → error honesto (503 `not_configured`).
- Comisión 18 %, Pro 12 €/vivienda/mes, kits, perfil destacado 15 €/mes = hipótesis: no activarlas automáticamente.
- Textos legales = borradores con [PENDIENTE].

## Diseño
Ver `DESIGN_SYSTEM.md`. Paleta estricta 60/30/10: #03203D / #639CC5 / #EB2F33 + #FFFFFF / #F5F4F0.
Anton (display) + Manrope (texto). Sin degradados, sin tarjetas redondeadas genéricas.
Respetar `prefers-reduced-motion` y scroll nativo. En carrito/checkout, animación mínima.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger (@gsap/react) · Lucide.
Fases siguientes: Supabase (DB, Auth, Storage, RLS), Stripe Checkout + webhooks (modo test), Resend.
No añadir Motion/Framer mientras GSAP cubra la necesidad (evitar librerías duplicadas).

## Flujo de trabajo
- Rama por fase (`fase-1-creative-web`, `fase-2-ecommerce`…), PR hacia `main`.
- Antes de commit: `npm run typecheck && npm run lint && npm test && npm run build`.
- Actualizar `PROGRESS.md` al terminar cada bloque de trabajo (fases, pendientes, bloqueos, decisiones).
- Secretos solo en `.env.local` / Vercel. Nunca en el repo ni en variables `NEXT_PUBLIC_*`.
