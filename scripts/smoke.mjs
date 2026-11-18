// Prueba de humo: recorre todas las rutas contra un servidor en marcha.
// Uso: npm run build && npm start  (en otra terminal)  →  npm run test:smoke
const base = process.env.BASE_URL || "http://localhost:3000";
const routes = [
  "/", "/catalogo", "/catalogo?categoria=limpieza", "/catalogo/pack-cambio-huesped", "/como-funciona", "/quienes-somos",
  "/contacto", "/profesionales", "/faq", "/carrito", "/checkout", "/pedido/confirmacion", "/login", "/registro", "/mi-cuenta",
  "/legal/aviso-legal", "/legal/privacidad", "/legal/cookies", "/legal/condiciones", "/legal/cancelacion",
  "/sitemap.xml", "/robots.txt", "/opengraph-image",
];
let failed = 0;
for (const r of routes) {
  const res = await fetch(base + r);
  const ok = res.status === 200;
  if (!ok) failed++;
  console.log(`${ok ? "✓" : "✗"} ${res.status} ${r}`);
}
const nf = await fetch(base + "/no-existe");
console.log(`${nf.status === 404 ? "✓" : "✗"} ${nf.status} /no-existe (espera 404)`);
if (nf.status !== 404) failed++;
const api = await fetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ startedAt: 0 }) });
console.log(`${[200, 422, 503].includes(api.status) ? "✓" : "✗"} ${api.status} POST /api/contact`);
process.exit(failed ? 1 : 0);
