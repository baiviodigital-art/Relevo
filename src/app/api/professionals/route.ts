import { NextResponse } from "next/server";
import { escapeHtml, isLikelySpam, validatePro } from "@/lib/validation";
import { sendInternalEmail } from "@/lib/mailer";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!rateLimit(`pro:${clientIp(req)}`)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  if (isLikelySpam(body)) return NextResponse.json({ ok: true });

  const v = validatePro(body);
  if (!v.ok) return NextResponse.json({ error: "validation", fields: v.errors }, { status: 422 });

  const d = v.data;
  const rows = [
    ["Nombre", d.name],
    ["Email", d.email],
    ["Teléfono", d.phone],
    ["Especialidades", d.specialties.join(", ")],
    ["Experiencia", d.experience],
    ["Zonas", d.zones.join(", ")],
    ["Disponibilidad", d.availability.join(", ")],
  ]
    .map(([k, val]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(val)}</td></tr>`)
    .join("");
  const result = await sendInternalEmail({
    subject: `[Relevo · Profesionales] ${d.specialties.join(", ")} — ${d.name}`,
    replyTo: d.email,
    html: `<table>${rows}</table><p>${escapeHtml(d.message || "—").replace(/\n/g, "<br>")}</p>`,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: result.reason === "not_configured" ? 503 : 502 });
  }
  return NextResponse.json({ ok: true });
}
