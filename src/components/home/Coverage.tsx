import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CanaryMap } from "./CanaryMap";

export function Coverage() {
  return (
    <section aria-labelledby="cobertura-title" className="bg-ink py-24 text-paper md:py-36">
      <div className="container-x">
        <SectionLabel n="07" dark>Cobertura</SectionLabel>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="cobertura-title" className="display text-[14vw] sm:text-[10vw] lg:text-[5vw]">
              Empezamos <br />
              por el <span className="text-scarlet">sur.</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-paper/80">
              Canarias es nuestro ámbito. Para cumplir lo que prometemos, el lanzamiento se propone en una sola zona: el sur de Gran Canaria
              (Playa del Inglés, San Agustín, Maspalomas).
            </p>
            <dl className="mt-10 space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <span aria-hidden className="mt-1 h-4 w-4 shrink-0 bg-scarlet" />
                <div>
                  <dt className="font-extrabold uppercase tracking-wider">Piloto propuesto</dt>
                  <dd className="mt-1 text-paper/75">Sur de Gran Canaria. Pendiente de activar: todavía no hay servicio operativo.</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span aria-hidden className="mt-1 h-4 w-4 shrink-0 border-2 border-dashed border-stone-2" />
                <div>
                  <dt className="font-extrabold uppercase tracking-wider">Expansión futura</dt>
                  <dd className="mt-1 text-paper/75">Tenerife, Lanzarote, Fuerteventura, La Palma, La Gomera y El Hierro, según los resultados del piloto.</dd>
                </div>
              </div>
            </dl>
          </div>
          <Reveal className="lg:col-span-8" y={30}>
            <div data-reveal className="text-paper">
              <CanaryMap className="h-auto w-full" />
              <p className="mt-3 text-xs text-paper/55">Esquema ilustrativo, no cartográfico.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
