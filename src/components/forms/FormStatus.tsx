import type { Status } from "./useFormSubmit";
import { site } from "@/lib/site";

const messages: Record<string, string> = {
  validation: "Revisa los campos marcados.",
  not_configured:
    "El envío de formularios todavía no está activado en este entorno (falta configurar el servicio de correo). Tu mensaje NO se ha enviado.",
  rate_limited: "Has enviado varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo.",
  provider_error: "No hemos podido enviar tu mensaje por un error del servicio de correo. Inténtalo de nuevo más tarde.",
  network: "Sin conexión con el servidor. Comprueba tu conexión e inténtalo de nuevo.",
};

export function FormStatus({ status, successText }: { status: Status; successText: string }) {
  return (
    <div aria-live="polite" role="status" className="min-h-6">
      {status.kind === "success" && <p className="border-l-4 border-ink bg-white px-4 py-3 font-semibold text-ink">{successText}</p>}
      {status.kind === "error" && (
        <p className="border-l-4 border-scarlet bg-white px-4 py-3 font-semibold text-ink">
          {messages[status.reason]}
          {status.reason !== "validation" && site.contact.email && (
            <>
              {" "}
              También puedes escribirnos a{" "}
              <a className="underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </>
          )}
        </p>
      )}
    </div>
  );
}
