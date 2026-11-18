import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { SceneArt } from "@/components/ui/SceneArt";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Button } from "@/components/ui/Button";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: "Relevo nace para coordinar los servicios que necesita una vivienda vacacional en Canarias: misión, visión, valores y equipo.",
  alternates: { canonical: "/quienes-somos" },
};

const values = [
  { t: "Cumplir antes que prometer", d: "Ofrecemos solo lo que podemos cubrir con profesionales reales en cada zona." },
  { t: "Transparencia", d: "Precios por vivienda, qué incluye cada servicio y qué no, antes de pagar." },
  { t: "Trazabilidad", d: "Cada trabajo deja constancia: estado, fotos e incidencias." },
  { t: "Trato justo", d: "Encargos claros y cobros seguros para los profesionales que hacen el trabajo." },
];

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        lines={["Nacimos", "para tomar", "el *relevo.*"]}
        intro="Un proyecto canario que parte de una idea sencilla: quien tiene una vivienda vacacional no debería tener que coordinar a cinco personas distintas cada vez que cambia un huésped."
      />

      <section aria-labelledby="historia" className="bg-paper py-24 text-ink md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <ImageReveal direction="up" className="relative aspect-[4/5] lg:col-span-5">
            <SceneArt scene="dunes" alt="Composición gráfica inspirada en las dunas del sur de Gran Canaria" className="h-full w-full" />
          </ImageReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel n="01">El problema</SectionLabel>
            <h2 id="historia" className="display mt-8 text-[12vw] sm:text-[8vw] lg:text-[4.6vw]">
              Una vivienda, <span className="text-scarlet">muchos</span> oficios
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
              <p>
                Una vivienda vacacional necesita limpieza entre reservas, lavandería, reposición, revisiones y, de vez en cuando, una reparación
                urgente. Normalmente cada cosa la hace alguien distinto y se coordina por teléfono o WhatsApp.
              </p>
              <p>
                Cuando el propietario vive fuera de Canarias, el problema crece: no puede comprobar si el trabajo se hizo, ni reaccionar rápido si un
                profesional falla. Las consecuencias llegan en forma de retrasos, reclamaciones y malas reseñas.
              </p>
              <p>
                Relevo centraliza esos servicios en una sola plataforma, con precio claro, seguimiento y prueba del trabajo. No alquilamos viviendas
                ni cobramos comisión sobre las reservas turísticas: nos ocupamos de que la vivienda funcione.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Misión y visión" className="bg-ink py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <SectionLabel n="02" dark>
              Misión
            </SectionLabel>
            <SplitWords
              lines={["Coordinar el trabajo", "invisible que hace", "*funcionar* una vivienda."]}
              className="display mt-8 text-[10vw] text-paper sm:text-[7vw] lg:text-[3.6vw]"
            />
          </div>
          <div>
            <SectionLabel n="03" dark>
              Visión
            </SectionLabel>
            <SplitWords
              lines={["Ser la referencia", "en Canarias para", "operar viviendas *vacacionales.*"]}
              className="display mt-8 text-[10vw] text-paper sm:text-[7vw] lg:text-[3.6vw]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="valores" className="bg-stone py-24 text-ink md:py-32">
        <div className="container-x">
          <SectionLabel n="04">Valores</SectionLabel>
          <h2 id="valores" className="sr-only">
            Valores
          </h2>
          <Reveal as="ol" className="mt-12 grid gap-x-10 md:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.t} data-reveal className="grid grid-cols-[4rem_1fr] border-t-2 border-ink py-8">
                <span aria-hidden className="display text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-4xl md:text-5xl">{v.t}</h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed">{v.d}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="canarias" className="bg-paper py-24 text-ink md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="05">Compromiso con Canarias</SectionLabel>
            <h2 id="canarias" className="display mt-8 text-[12vw] sm:text-[8vw] lg:text-[4.6vw]">
              Hecho aquí. <br />
              Para <span className="text-scarlet">aquí.</span>
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/85 lg:col-span-6 lg:col-start-7">
            <p>
              Trabajamos con profesionales locales y queremos que el valor que genera el turismo llegue también a quienes mantienen las viviendas a
              punto: limpiadoras, técnicos, jardineros, lavanderías.
            </p>
            <p>
              Empezamos por una zona concreta, el sur de Gran Canaria, porque preferimos crecer isla a isla cumpliendo lo que prometemos que abrir en
              todo el archipiélago sin capacidad real.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="equipo" className="bg-ink py-24 md:py-32">
        <div className="container-x">
          <SectionLabel n="06" dark>
            Equipo fundador
          </SectionLabel>
          <h2 id="equipo" className="display mt-8 text-[12vw] text-paper sm:text-[8vw] lg:text-[4.6vw]">
            Las personas detrás
          </h2>
          <Reveal as="ul" className="mt-12 border-t border-paper/15">
            {team.map((p) => (
              <li key={p.name} data-reveal className="group flex items-baseline justify-between gap-6 border-b border-paper/15 py-6">
                <span className="display text-4xl text-paper transition-colors group-hover:text-stone-2 md:text-6xl">{p.name}</span>
                {p.role && <span className="text-sm font-semibold text-paper/65">{p.role}</span>}
              </li>
            ))}
          </Reveal>
          <p className="mt-6 max-w-xl text-sm text-paper/60">
            Cargos, biografías y fotografías se añadirán cuando el equipo los facilite. No publicamos datos que no hayan sido confirmados.
          </p>
          <div className="mt-14">
            <Button href="/contacto">Hablemos</Button>
          </div>
        </div>
      </section>
    </>
  );
}
