import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description: "Selecciona el servicio, configura tu vivienda, paga de forma segura y consulta el resultado con fotos. Así funciona Relevo.",
  alternates: { canonical: "/como-funciona" },
};

const commitments = [
  {
    t: "Fecha solicitada ≠ fecha confirmada",
    d: "Cuando contratas, la fecha queda como solicitada. Solo pasa a confirmada cuando un profesional disponible la acepta. Si no podemos confirmarla, te avisamos y no se ejecuta el cobro definitivo.",
  },
  {
    t: "Sustitución con condiciones claras",
    d: "Si un profesional falla, buscamos sustituto dentro de la zona, el horario y la antelación definidos para cada servicio. No prometemos sustituciones que no podamos cubrir.",
  },
  {
    t: "Comprobación del trabajo",
    d: "Cada servicio termina con fotos y un checklist. Si algo no está bien, se registra como incidencia y se gestiona desde el mismo pedido.",
  },
  {
    t: "Pago seguro y por uso",
    d: "Pagas solo lo que contratas, con pasarela segura. No almacenamos datos de tarjeta y no cobramos comisión sobre tus reservas turísticas.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="Cómo funciona"
        lines={["Del pedido", "a la *prueba.*"]}
        intro="Relevo convierte la coordinación de tu vivienda en un proceso de cuatro pasos. Sin cadenas de mensajes ni llamadas para saber si ya está todo listo."
        scene="keys"
        sceneAlt="Composición gráfica de una puerta canaria en arco con una llave"
      />
      <HowItWorks withCta={false} />
      <section aria-labelledby="compromisos" className="bg-paper py-24 text-ink md:py-32">
        <div className="container-x">
          <SectionLabel n="—">Lo que puedes esperar</SectionLabel>
          <h2 id="compromisos" className="display mt-10 max-w-4xl text-[12vw] sm:text-[8vw] lg:text-[5vw]">
            Compromisos <span className="text-scarlet">realistas</span>
          </h2>
          <Reveal className="mt-14 grid gap-px bg-ink/15 md:grid-cols-2">
            {commitments.map((c, i) => (
              <article key={c.t} data-reveal className="bg-paper p-8 md:p-12">
                <p aria-hidden className="display text-5xl text-stone">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-2xl font-extrabold">{c.t}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-ink/80">{c.d}</p>
              </article>
            ))}
          </Reveal>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/catalogo">Explorar servicios</Button>
            <Button href="/faq" variant="ghost" arrow={false}>
              Preguntas frecuentes
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
