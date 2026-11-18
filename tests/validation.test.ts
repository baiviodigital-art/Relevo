import { test } from "node:test";
import assert from "node:assert/strict";
import { isLikelySpam, validateContact, validatePro, escapeHtml, MIN_FILL_MS } from "../src/lib/validation.ts";

const okContact = {
  name: "Ana",
  email: "ana@example.com",
  phone: "",
  clientType: "Propietario no residente",
  reason: "Presupuesto",
  message: "Tengo un apartamento en Maspalomas.",
  privacy: true,
};

test("contacto válido", () => {
  const r = validateContact(okContact);
  assert.equal(r.ok, true);
});

test("contacto: email, privacidad y mensaje obligatorios", () => {
  const r = validateContact({ ...okContact, email: "no-es-email", privacy: false, message: "hola" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["email", "message", "privacy"]);
});

test("contacto: rechaza opciones fuera de lista", () => {
  const r = validateContact({ ...okContact, clientType: "Hacker" });
  assert.equal(r.ok, false);
});

test("profesionales: filtra valores no permitidos y exige selección", () => {
  const r = validatePro({
    name: "Luis",
    email: "luis@example.com",
    phone: "+34 600 000 000",
    specialties: ["Limpieza", "<script>"],
    experience: "1 a 3 años",
    zones: ["Sur de Gran Canaria"],
    availability: ["Mañanas"],
    privacy: "on",
  });
  assert.equal(r.ok, true);
  if (r.ok) assert.deepEqual(r.data.specialties, ["Limpieza"]);
  const bad = validatePro({ name: "Luis", email: "luis@example.com", phone: "123", specialties: [], privacy: true });
  assert.equal(bad.ok, false);
});

test("anti-spam: honeypot y tiempo mínimo", () => {
  const now = 1_000_000;
  assert.equal(isLikelySpam({ website: "http://spam", startedAt: now - 10_000 }, now), true);
  assert.equal(isLikelySpam({ startedAt: now - 500 }, now), true);
  assert.equal(isLikelySpam({ startedAt: now - MIN_FILL_MS - 1 }, now), false);
  assert.equal(isLikelySpam({}, now), true);
});

test("escapeHtml neutraliza HTML", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
});
