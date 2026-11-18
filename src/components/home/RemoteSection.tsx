import { Camera, CalendarDays, AlertTriangle, Receipt, RefreshCw, CheckCircle2 } from "lucide-react";
import { SplitWords } from "@/components/motion/SplitWords";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  { icon: CalendarDays, label: "Próximos servicios y calendario", status: "En desarrollo" },
  { icon: Camera, label: "Fotos del trabajo terminado", status: "En desarrollo" },
  { icon: AlertTriangle, label: "Registro de incidencias", status: "En desarrollo" },
  { icon: Receipt, label: "Facturas con IGIC", status: "En desarrollo" },
  { icon: RefreshCw, label: "Sincronización con Airbnb y Booking", status: "Futuro · sin conexión activa" },
];

/** Gestión a distancia + vista previa del panel. Todo el contenido del panel es ilustrativo. */
export function RemoteSection() {
  return (
    <section aria-labelledby="distancia-title" className="relative overflow-hidden bg-stone py-24 text-ink md:py-36">
      <div className="container-x">
        <SectionLabel n="05">Gestión a distancia</SectionLabel>
        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SplitWords
              id="distancia-title"
              lines={["Lejos de tu", "vivienda.", "Cerca de *todo.*"]}
              className="display text-[14vw] sm:text-[10vw] lg:text-[5.6vw]"
            />
            <p className="mt-8 max-w-md text-lg leading-relaxed">
              Para propietarios que viven en la Península o en el extranjero: contrata, paga y consulta el estado de cada servicio desde cualquier
              lugar. Sin depender de que alguien te escriba para contarte cómo ha quedado la vivienda.
            </p>
            <ul className="mt-8 space-y-3 font-semibold">
              {["Profesionales verificados antes de trabajar", "Fotos al terminar cada servicio", "Pago remoto seguro", "Varios usuarios por vivienda (familias, gestores)"].map(
                (t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Vista previa del futuro panel (ilustrativa) */}
          <Reveal className="relative lg:col-span-7" y={60}>
            <figure data-reveal className="relative bg-ink p-4 text-paper shadow-[24px_24px_0_0_#03203D33] md:p-6">
              <div className="flex items-center justify-between border-b border-paper/10 pb-4">
                <p className="eyebrow text-stone-2">Mi cuenta · Vista previa</p>
                <span className="bg-scarlet px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">Ilustrativo</span>
              </div>
              <div className="grid gap-4 pt-5 md:grid-cols-5">
                <div className="md:col-span-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-paper/60">Vivienda de ejemplo</p>
                  <p className="display mt-1 text-4xl">Apartamento · 55 m²</p>
                  <ol className="mt-5 space-y-2 text-sm">
                    {[
                      ["Solicitado", "Fecha pendiente de confirmar"],
                      ["Confirmado", "Profesional asignado"],
                      ["En curso", "—"],
                      ["Terminado", "Fotos disponibles"],
                    ].map(([s, d], i) => (
                      <li key={s} className={`flex items-center justify-between border px-3 py-2.5 ${i === 1 ? "border-scarlet bg-ink-2" : "border-paper/10"}`}>
                        <span className="font-bold">{s}</span>
                        <span className="text-paper/60">{d}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid grid-cols-2 gap-2 md:col-span-2 md:grid-cols-1">
                  {[0, 1].map((i) => (
                    <div key={i} className="relative aspect-[4/3] bg-stone/25">
                      <Camera className="absolute inset-0 m-auto h-6 w-6 text-paper/40" aria-hidden />
                      <span className="absolute bottom-1 left-1 text-[10px] font-bold uppercase text-paper/60">Foto {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <figcaption className="mt-5 border-t border-paper/10 pt-4">
                <p className="mb-3 text-xs text-paper/65">Funciones previstas para el área privada. Ninguna está activa todavía.</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {features.map(({ icon: Icon, label, status }) => (
                    <li key={label} className="flex items-center gap-3 text-sm">
                      <Icon className="h-4 w-4 shrink-0 text-stone-2" aria-hidden />
                      <span className="flex-1">{label}</span>
                      <span className="whitespace-nowrap text-[11px] font-bold uppercase text-paper/55">{status}</span>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
