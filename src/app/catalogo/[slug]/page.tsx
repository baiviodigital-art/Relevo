import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { TLink } from "@/components/motion/TLink";
import { SceneArt } from "@/components/ui/SceneArt";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Notice } from "@/components/ui/Notice";
import { Button } from "@/components/ui/Button";
import { availabilityLabel, formatEUR, getCategory, getService, services, servicesByCategory } from "@/data/services";

export function generateStaticParams() {
  return services.filter((s) => s.enabled).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.name, description: s.summary, alternates: { canonical: `/catalogo/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const cat = getCategory(s.category)!;
  const related = servicesByCategory(s.category).filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="bg-ink pb-16 pt-[calc(var(--nav-h)+2rem)] text-paper md:pb-24">
        <div className="container-x">
          <nav aria-label="Ruta" className="text-sm text-paper/65">
            <TLink href="/catalogo" className="link-underline">
              Catálogo
            </TLink>{" "}
            /{" "}
            <TLink href={`/catalogo?categoria=${cat.slug}`} className="link-underline">
              {cat.name}
            </TLink>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-stone-2">
                {cat.number} · {cat.name}
              </p>
              <h1 className="display mt-4 text-[14vw] sm:text-[10vw] lg:text-[6.4vw]">{s.name}</h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-paper/80">{s.summary}</p>
              <div className="mt-8 flex flex-wrap items-end gap-6">
                <div>
                  <p className="text-sm text-paper/65">Desde</p>
                  <p className="display text-6xl">
                    {formatEUR(s.demoFrom)}
                    <span className="font-sans text-lg font-bold text-paper/70">/{s.unit}</span>
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-paper/65">Precio de demostración · IGIC no incluido</p>
                </div>
                <span className="border border-paper/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">{availabilityLabel[s.availability]}</span>
              </div>
            </div>
            <ImageReveal onLoad className="relative aspect-[4/3] lg:col-span-5">
              <SceneArt scene={cat.scene} alt="" priority className="h-full w-full" />
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h2 className="eyebrow border-b-2 border-ink pb-3">Qué incluye</h2>
              <ul className="mt-4 space-y-3">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow border-b-2 border-ink pb-3">Qué no incluye</h2>
              <ul className="mt-4 space-y-3 text-ink/80">
                {s.excludes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-scarlet" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <h2 className="eyebrow border-b-2 border-ink pb-3">Condiciones</h2>
              <p className="mt-4 leading-relaxed text-ink/80">
                El precio final dependerá de la superficie (menos de 40 m², 40–69, 70–109, 110–159 o 160 m² o más), habitaciones, baños y extras. La
                fecha elegida queda como solicitada hasta que un profesional la confirma. Consulta las{" "}
                <TLink href="/legal/condiciones" className="font-bold underline">
                  condiciones de contratación
                </TLink>
                .
              </p>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-2 border-ink p-6">
              <h2 className="text-xl font-extrabold">Configurar este servicio</h2>
              <p className="mt-3 text-ink/80">
                El configurador (isla, municipio, vivienda, superficie, fecha, franja y extras) y el carrito llegan en la fase 2.
              </p>
              <Notice tone="light" className="mt-4">
                Todavía no se puede contratar. No se guarda ni se cobra nada.
              </Notice>
              <div className="mt-6">
                <Button href="/contacto" variant="ink">
                  Pedir información
                </Button>
              </div>
            </div>
          </aside>
        </div>
        {related.length > 0 && (
          <div className="container-x mt-20 border-t-2 border-ink pt-10">
            <h2 className="eyebrow">Servicios complementarios</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <TLink href={`/catalogo/${r.slug}`} className="group flex items-start justify-between gap-4 border-b border-ink/15 pb-4">
                    <span className="text-xl font-extrabold">{r.name}</span>
                    <span className="text-sm text-ink/70">desde {formatEUR(r.demoFrom)}</span>
                  </TLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
