import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SceneArt } from "@/components/ui/SceneArt";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getService, formatEUR } from "@/data/services";

export function PackSection() {
  const pack = getService("pack-cambio-huesped");
  if (!pack) return null;
  return (
    <section aria-labelledby="pack-title" className="bg-paper py-24 text-ink md:py-36">
      <div className="container-x">
        <SectionLabel n="06">Pack destacado</SectionLabel>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <ImageReveal direction="left" className="relative aspect-[4/5] lg:col-span-5">
            <SceneArt scene="villa" alt="Composición gráfica de una vivienda preparada para la llegada de huéspedes" className="h-full w-full" />
          </ImageReveal>

          <div className="flex flex-col justify-between lg:col-span-7 lg:pl-8">
            <div>
              <p className="eyebrow text-ink/70">Para el día de salida y llegada</p>
              <h2 id="pack-title" className="display mt-4 text-[15vw] sm:text-[11vw] lg:text-[7.2vw]">
                Pack cambio <br />
                de <span className="text-scarlet">huésped</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/80">
                Lo que más se repite en una vivienda vacacional, resuelto en una sola reserva. Pensado para apartamentos con reservas
                consecutivas.
              </p>
            </div>

            <Reveal as="ul" className="mt-10 border-t-2 border-ink">
              {pack.includes.map((x, i) => (
                <li key={x} data-reveal className="flex items-baseline gap-5 border-b border-ink/15 py-4">
                  <span aria-hidden className="display w-10 text-2xl text-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-bold md:text-2xl">{x}</span>
                </li>
              ))}
            </Reveal>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-ink/70">Desde</p>
                <p className="display text-7xl">{formatEUR(pack.demoFrom)}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/70">Precio de demostración · IGIC no incluido</p>
              </div>
              <Button href={`/catalogo/${pack.slug}`}>Configurar el pack</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
