import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TLink } from "@/components/motion/TLink";
import { SceneArt } from "@/components/ui/SceneArt";
import { Notice } from "@/components/ui/Notice";
import { ArrowIcon } from "@/components/ui/Arrow";
import { availabilityLabel, categories, formatEUR, getCategory, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Catálogo de servicios",
  description: "Limpieza, mantenimiento, check-in, lavandería, reposición, piscina y jardinería para viviendas vacacionales en Canarias.",
  alternates: { canonical: "/catalogo" },
};

export default async function CatalogoPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams;
  const active = categoria ? getCategory(categoria) : undefined;
  const list = services.filter((s) => s.enabled && (!active || s.category === active.slug));

  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        lines={["Elige.", "Configura.", "*Listo.*"]}
        intro="Todos los servicios que necesita una vivienda vacacional, con precio según tu vivienda. Los precios mostrados son de demostración."
      />
      <section className="bg-paper py-16 text-ink md:py-24">
        <div className="container-x">
          <Notice tone="light" className="max-w-3xl">
            Catálogo en construcción (fase 2): buscador, filtros por ubicación y tipo de vivienda, configurador y carrito se están desarrollando.
            Ningún servicio está disponible para contratar todavía.
          </Notice>

          <nav aria-label="Categorías" className="mt-10 flex gap-2 overflow-x-auto pb-2">
            <TLink
              href="/catalogo"
              aria-current={!active ? "page" : undefined}
              className="shrink-0 border-2 border-ink px-4 py-2.5 text-sm font-bold aria-[current=page]:bg-ink aria-[current=page]:text-paper"
            >
              Todos
            </TLink>
            {categories.map((c) => (
              <TLink
                key={c.slug}
                href={`/catalogo?categoria=${c.slug}`}
                aria-current={active?.slug === c.slug ? "page" : undefined}
                className="shrink-0 border-2 border-ink/25 px-4 py-2.5 text-sm font-bold hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
              >
                {c.name}
              </TLink>
            ))}
          </nav>

          {active && (
            <div className="mt-12 grid gap-8 border-t-2 border-ink pt-10 md:grid-cols-12">
              <p aria-hidden className="display text-8xl text-stone md:col-span-2">
                {active.number}
              </p>
              <div className="md:col-span-7">
                <h2 className="display text-6xl md:text-7xl">{active.name}</h2>
                <p className="mt-4 max-w-xl text-lg text-ink/80">{active.description}</p>
              </div>
            </div>
          )}

          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => {
              const cat = getCategory(s.category)!;
              return (
                <li key={s.slug}>
                  <TLink href={`/catalogo/${s.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105">
                        <SceneArt scene={cat.scene} alt="" className="h-full w-full" />
                      </div>
                      <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-paper">{cat.name}</span>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-extrabold leading-tight">{s.name}</h3>
                      <ArrowIcon className="mt-1.5 h-5 w-5 shrink-0 text-scarlet" />
                    </div>
                    <p className="mt-2 text-ink/75">{s.summary}</p>
                    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-ink/15 pt-3 text-sm">
                      <span className="font-extrabold">
                        Desde {formatEUR(s.demoFrom)}/{s.unit}
                      </span>
                      <span className="text-ink/60">Precio demo</span>
                      <span className="ml-auto font-semibold text-ink/70">{availabilityLabel[s.availability]}</span>
                    </p>
                  </TLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
