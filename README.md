# Relevo

Web de **Relevo**, plataforma de contratación y coordinación de servicios para viviendas vacacionales en Canarias
(limpieza, mantenimiento, check-in/out, lavandería, reposición, piscina y jardinería).

> Estado: **Fase 1 (Creative Web Design) completada**. Catálogo navegable sin contratación; carrito, pagos y área privada en fases 2–4.
> Ver [`PROGRESS.md`](PROGRESS.md).

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript 5.9
- Tailwind CSS 4 (tokens en `src/app/globals.css`)
- GSAP 3 + ScrollTrigger (`@gsap/react`) · Lucide
- Formularios → Route Handlers → Resend (API REST)
- Previsto: Supabase (PostgreSQL, Auth, Storage, RLS) y Stripe Checkout + webhooks (modo test)

## Puesta en marcha local
Requisitos: Node.js ≥ 20.9 y npm.

```bash
npm install
cp .env.example .env.local   # opcional en fase 1
npm run dev                  # http://localhost:3000
```

## Scripts
| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Compilación y servidor de producción |
| `npm run typecheck` | TypeScript sin emitir |
| `npm run lint` | ESLint (config de Next) |
| `npm test` | Pruebas unitarias (`node --test`): validación, anti-spam, integridad del catálogo |
| `npm run test:smoke` | Recorre todas las rutas contra un servidor en marcha (`BASE_URL`, por defecto `http://localhost:3000`) |

## Variables de entorno
Ver [`.env.example`](.env.example). En fase 1 todas son opcionales:

| Variable | Efecto |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica para sitemap y Open Graph |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Si existen, aparecen los accesos de email/WhatsApp; si no, se ocultan |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_INBOX_EMAIL` | Activan el envío real de los formularios. Sin ellas, la API responde `503 not_configured` y el usuario ve que su mensaje **no** se envió |

## Despliegue en Vercel
1. En Vercel: **Add New → Project → Import** el repositorio `relevo`.
2. Framework: Next.js (detección automática). Sin cambios en build/output.
3. Añade las variables de entorno (Production y Preview) según la tabla anterior. Para formularios: verifica un dominio en Resend.
4. Deploy. Cada PR genera una preview automática.

## Estructura
```
src/
  app/                 Rutas (App Router), API, sitemap, robots, OG image
  components/
    home/              Secciones de la landing
    layout/            Navbar, menú móvil, footer, cabeceras
    motion/            Transiciones y animaciones GSAP
    forms/             Campos y formularios
    ui/                Primitivas (botones, flechas, marquee, SceneArt…)
  data/                Catálogo, FAQ, legales, equipo (contenido tipado)
  lib/                 Config del sitio, validación, mailer, carrito, i18n, gsap
tests/                 Pruebas unitarias
scripts/smoke.mjs      Prueba de humo de rutas
```

## Documentación
- [`CLAUDE.md`](CLAUDE.md): reglas permanentes del proyecto (incluida la prohibición de artefactos).
- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md): color, contraste, tipografía, movimiento y componentes.
- [`PROGRESS.md`](PROGRESS.md): fases, pendientes, bloqueos y decisiones técnicas.
