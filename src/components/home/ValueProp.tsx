import { SplitWords } from "@/components/motion/SplitWords";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const benefits = [
  {
    k: "Ahorro de tiempo",
    t: "Un solo pedido sustituye a las llamadas, mensajes y recordatorios con cada profesional.",
  },
  {
    k: "Coordinación centralizada",
    t: "Limpieza, lavandería, reposición y mantenimiento se organizan en torno a tus reservas, no al revés.",
  },
  {
    k: "Seguimiento",
    t: "Cada servicio tiene un estado: solicitado, confirmado, en curso, terminado.",
  },
  {
    k: "Gestión a distancia",
    t: "Pensado para quien vive fuera de Canarias y necesita saber qué ha pasado sin desplazarse.",
  },
  {
    k: "Transparencia",
    t: "Precio según la vivienda, qué incluye y qué no, antes de confirmar. Sin comisión sobre tus reservas turísticas.",
  },
];

export function ValueProp() {
  return (
          <section aria-labelledby="valor-title" className="bg-paper py-24 text-ink md:py-36">
        <div className="container-x">
          <SectionLabel n="02">Propuesta de valor</SectionLabel>
          <div className="mt-12 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-28">
                <SplitWords
                  id="valor-title"
                  lines={["Menos", "preocupaciones.", "Más *control.*"]}
                  className="display text-[15vw] sm:text-[11vw] lg:text-[6.6vw]"
                />
                <p className="mt-10 max-w-md text-lg leading-relaxed text-ink/80">
                  Coordinamos la preparación de tu vivienda entre reservas, con comprobación del trabajo y un procedimiento de respuesta ante
                  incidencias. Tú decides qué se hace; nosotros nos ocupamos de que ocurra.
                </p>
              </div>
            </div>

            <Reveal as="ol" className="lg:col-span-6" stagger={0.1}>
              {benefits.map((b, i) => (
                <li
                  key={b.k}
                  data-reveal
                  className="group grid grid-cols-[4.5rem_1fr] gap-x-4 border-t border-ink/15 py-8 transition-colors last:border-b md:grid-cols-[7rem_1fr]"
                >
                  <span aria-hidden className="display text-6xl text-stone transition-colors duration-500 group-hover:text-scarlet md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">{b.k}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/75">{b.t}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
  );
}
