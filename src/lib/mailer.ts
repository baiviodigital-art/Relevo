import "server-only";

/**
 * Envío de correo con Resend vía API REST (sin SDK adicional).
 * Si faltan variables de entorno, devuelve `not_configured` y el formulario lo comunica
 * al usuario: nunca se simula un envío correcto.
 */
export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

export function mailerConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.CONTACT_INBOX_EMAIL);
}

export async function sendInternalEmail({ subject, html, replyTo }: { subject: string; html: string; replyTo?: string }): Promise<SendResult> {
  if (!mailerConfigured()) return { ok: false, reason: "not_configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.CONTACT_INBOX_EMAIL],
        subject,
        html,
        reply_to: replyTo,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[mailer] Resend respondió", res.status);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[mailer] Error de red", err);
    return { ok: false, reason: "provider_error" };
  }
}
