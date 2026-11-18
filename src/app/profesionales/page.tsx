import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ProForm } from "@/components/forms/ProForm";
import { Notice } from "@/components/ui/Notice";

export const metadata: Metadata = {
  title: "Profesionales",
  description: "¿Trabajas en limpieza, mantenimiento, lavandería, jardinería o piscinas en Canarias? Solicita colaborar con Relevo.",
  alternates: { canonical: "/profesionales" },
};

const perks = [
  { t: "Nuevos clientes", d: "Propietarios y gestores que buscan profesionales fiables en tu zona." },
  { t: "Encargos organizados", d: "Cada trabajo llega con dirección, franja horaria, checklist e instrucciones." },
  { t: "Coordinación", d: "Nosotros hablamos con el propietario; tú te centras en el trabajo." },
  { t: "Seguimiento", d: "Historial de trabajos y fotos que demuestran lo que has hecho." },
  { t: "Cobros claros", d: "Pago anticipado por el cliente y condiciones de liquidación por escrito." },
  { t: "Reputación", d: "Valoraciones que construyen tu perfil profesional con cada servicio." },
];

export default function ProfesionalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Para profesionales"
        lines={["Tu talento.", "Nuestra *red.*"]}
        intro="Buscamos profesionales para el piloto en el sur de Gran Canaria y queremos conocer a quienes trabajan en el resto de islas."
        scene="tools"
        sceneAlt="Composición gráfica de azulejos y una tubería con una llave de paso roja"
      />
      <section aria-labelledby="ventajas" className="bg-paper py-24 text-ink md:py-32">
        <div className="container-x">
          <SectionLabel n="01">Por qué Relevo</SectionLabel>
          <h2 id="ventajas" className="sr-only">
            Ventajas de colaborar
          </h2>
          <Reveal as="ul" className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => (
              <li key={p.t} data-reveal className="bg-paper p-8">
                <span aria-hidden className="display text-4xl text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold">{p.t}</h3>
                <p className="mt-2 leading-relaxed text-ink/80">{p.d}</p>
              </li>
            ))}
          </Reveal>
          <Notice tone="light" className="mt-10 max-w-3xl">
            Relevo está en fase de validación. No podemos garantizar un volumen de trabajo concreto: te informaremos de la demanda prevista en tu zona
            antes de que te comprometas.
          </Notice>
        </div>
      </section>
      <section aria-labelledby="solicitud" className="bg-paper pb-24 text-ink md:pb-32">
        <div className="container-x grid gap-12 border-t-2 border-ink pt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel n="02">Solicitud</SectionLabel>
            <h2 id="solicitud" className="display mt-8 text-[12vw] sm:text-[8vw] lg:text-[4.4vw]">
              Cuéntanos <span className="text-scarlet">qué haces</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ProForm />
          </div>
        </div>
      </section>
    </>
  );
}
