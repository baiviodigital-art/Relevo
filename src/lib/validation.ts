/**
 * Validación compartida cliente/servidor para los formularios públicos.
 * Sin dependencias para poder probarla con `node --test`.
 */

export const CLIENT_TYPES = ["Propietario residente en Canarias", "Propietario no residente", "Gestor de alojamientos", "Profesional", "Otro"] as const;
export const CONTACT_REASONS = ["Información sobre servicios", "Presupuesto", "Colaboración", "Prensa", "Otro"] as const;
export const SPECIALTIES = ["Limpieza", "Mantenimiento", "Fontanería", "Electricidad", "Check-in / check-out", "Lavandería", "Piscinas", "Jardinería"] as const;
export const ZONES = ["Sur de Gran Canaria", "Resto de Gran Canaria", "Tenerife", "Lanzarote", "Fuerteventura", "La Palma", "La Gomera", "El Hierro"] as const;
export const AVAILABILITY = ["Mañanas", "Tardes", "Fines de semana", "Jornada completa", "Puntual"] as const;

export type FieldErrors = Record<string, string>;
export type Result<T> = { ok: true; data: T } | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;
/** Tiempo mínimo para rellenar un formulario: por debajo, casi seguro un bot. */
export const MIN_FILL_MS = 3000;

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const strArr = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((x) => x.trim()) : []);

/** Comprobaciones anti-spam: honeypot vacío y tiempo mínimo de cumplimentación. */
export function isLikelySpam(input: Record<string, unknown>, now = Date.now()): boolean {
  if (str(input.website)) return true;
  const started = Number(input.startedAt);
  if (!Number.isFinite(started) || now - started < MIN_FILL_MS) return true;
  return false;
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  clientType: string;
  reason: string;
  message: string;
}

export function validateContact(input: Record<string, unknown>): Result<ContactData> {
  const d: ContactData = {
    name: str(input.name, 120),
    email: str(input.email, 200).toLowerCase(),
    phone: str(input.phone, 30),
    clientType: str(input.clientType, 80),
    reason: str(input.reason, 80),
    message: str(input.message, 4000),
  };
  const e: FieldErrors = {};
  if (d.name.length < 2) e.name = "Indica tu nombre.";
  if (!EMAIL_RE.test(d.email)) e.email = "Introduce un email válido.";
  if (d.phone && !PHONE_RE.test(d.phone)) e.phone = "El teléfono no parece válido.";
  if (!(CLIENT_TYPES as readonly string[]).includes(d.clientType)) e.clientType = "Selecciona un tipo de cliente.";
  if (!(CONTACT_REASONS as readonly string[]).includes(d.reason)) e.reason = "Selecciona un motivo.";
  if (d.message.length < 10) e.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  if (input.privacy !== true && input.privacy !== "on") e.privacy = "Debes aceptar la política de privacidad.";
  return Object.keys(e).length ? { ok: false, errors: e } : { ok: true, data: d };
}

export interface ProData {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  experience: string;
  zones: string[];
  availability: string[];
  message: string;
}

export function validatePro(input: Record<string, unknown>): Result<ProData> {
  const d: ProData = {
    name: str(input.name, 120),
    email: str(input.email, 200).toLowerCase(),
    phone: str(input.phone, 30),
    specialties: strArr(input.specialties).filter((x) => (SPECIALTIES as readonly string[]).includes(x)),
    experience: str(input.experience, 40),
    zones: strArr(input.zones).filter((x) => (ZONES as readonly string[]).includes(x)),
    availability: strArr(input.availability).filter((x) => (AVAILABILITY as readonly string[]).includes(x)),
    message: str(input.message, 3000),
  };
  const e: FieldErrors = {};
  if (d.name.length < 2) e.name = "Indica tu nombre o el de tu empresa.";
  if (!EMAIL_RE.test(d.email)) e.email = "Introduce un email válido.";
  if (!PHONE_RE.test(d.phone)) e.phone = "Indica un teléfono de contacto válido.";
  if (!d.specialties.length) e.specialties = "Selecciona al menos una especialidad.";
  if (!["Menos de 1 año", "1 a 3 años", "3 a 10 años", "Más de 10 años"].includes(d.experience)) e.experience = "Selecciona tu experiencia.";
  if (!d.zones.length) e.zones = "Selecciona al menos una zona.";
  if (!d.availability.length) e.availability = "Selecciona tu disponibilidad.";
  if (input.privacy !== true && input.privacy !== "on") e.privacy = "Debes aceptar la política de privacidad.";
  return Object.keys(e).length ? { ok: false, errors: e } : { ok: true, data: d };
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
