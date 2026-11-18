"use client";

import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export const steps = [
  {
    title: "Selecciona tu servicio",
    text: "Elige en el catálogo lo que necesita tu vivienda: una limpieza entre reservas, una reparación o un pack completo.",
  },
  {
    title: "Configura tu vivienda",
    text: "Isla, municipio, superficie, habitaciones, baños, fecha y franja horaria. El precio se calcula con esos datos, sin sorpresas.",
  },
  {
    title: "Confirma y paga",
    text: "Revisas el resumen y pagas de forma segura. La fecha queda como solicitada hasta que confirmamos un profesional disponible.",
  },
  {
    title: "Consulta el resultado",
    text: "Al terminar recibes el estado del servicio y las fotos del trabajo. Si algo falla, queda registrado como incidencia.",
  },
];

export function HowItWorks({ withCta = true }: { withCta?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-step-line]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 60%", end: "bottom 60%", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="como-title" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <SectionLabel n="04" dark>
          Cómo funciona
        </SectionLabel>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 id="como-title" className="display text-[14vw] text-paper sm:text-[10vw] lg:text-[5.4vw]">
                Cuatro pasos. <span className="text-scarlet">Ninguna</span> llamada.
              </h2>
              <div aria-hidden className="relative mt-6 hidden h-[22rem] overflow-hidden lg:block">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`display absolute inset-0 text-[22rem] leading-[0.8] text-stone transition-all duration-700 ease-[var(--ease-out-expo)] ${
                      active === i ? "translate-y-0 opacity-100" : active > i ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ol data-steps className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-paper/15" />
            <span aria-hidden data-step-line className="absolute left-0 top-0 h-full w-px origin-top bg-scarlet" />
            {steps.map((s, i) => (
              <li key={s.title} data-step className="relative py-10 pl-10 md:py-16 md:pl-14">
                <span
                  aria-hidden
                  className={`absolute -left-[5px] top-[3.1rem] h-[11px] w-[11px] transition-colors md:top-[4.6rem] ${active >= i ? "bg-scarlet" : "bg-paper/30"}`}
                />
                <p className="display text-7xl text-stone lg:hidden">{i + 1}</p>
                <h3 className={`display mt-2 text-4xl transition-colors duration-500 md:text-6xl ${active === i ? "text-paper" : "text-paper/45"}`}>
                  <span className="sr-only">Paso {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        {withCta && (
          <div className="mt-10 flex justify-start lg:justify-end">
            <Button href="/como-funciona" variant="ghost" className="text-paper">
              Ver el proceso completo
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
