import { test } from "node:test";
import assert from "node:assert/strict";
import { categories, services } from "../src/data/services.ts";

test("cada servicio pertenece a una categoría existente", () => {
  const slugs = new Set(categories.map((c) => c.slug));
  for (const s of services) assert.ok(slugs.has(s.category), `${s.slug} → ${s.category}`);
});

test("slugs de servicio únicos y aptos para URL", () => {
  const seen = new Set<string>();
  for (const s of services) {
    assert.match(s.slug, /^[a-z0-9-]+$/);
    assert.ok(!seen.has(s.slug), `duplicado: ${s.slug}`);
    seen.add(s.slug);
  }
});

test("todas las categorías tienen al menos un servicio", () => {
  for (const c of categories) assert.ok(services.some((s) => s.category === c.slug), c.slug);
});

test("precios de demostración positivos", () => {
  for (const s of services) assert.ok(s.demoFrom > 0, s.slug);
});
