"use client";

import { useRef } from "react";
import { TLink } from "@/components/motion/TLink";
import { SceneArt } from "@/components/ui/SceneArt";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowIcon } from "@/components/ui/Arrow";
import { categories } from "@/data/services";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const featured = categories.filter((c) => c.slug !== "packs");

/**
 * Servicios destacados: desplazamiento horizontal anclado en escritorio,
 * lista vertical en móvil y con movimiento reducido. El scroll sigue siendo nativo.
 */
export function ServicesRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to("[data-rail-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        return () => tween.kill();
      });
      ScrollTrigger.refresh();
    },
    { scope: section },
  );

  return (
    <section ref={section} aria-labelledby="servicios-title" className="relative overflow-hidden bg-ink py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x lg:pt-[var(--nav-h)]">
        <SectionLabel n="03" dark>
          Servicios
        </SectionLabel>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 id="servicios-title" className="display text-[14vw] text-paper sm:text-[10vw] lg:text-[4.6vw]">
            Todo lo que tu <span className="text-scarlet">vivienda</span> necesita
          </h2>
          <TLink href="/catalogo" className="group inline-flex items-center gap-2 pb-2 font-bold text-stone-2 link-underline">
            Ver catálogo completo <ArrowIcon />
          </TLink>
        </div>
      </div>

      <div
        ref={track}
        className="container-x mt-12 flex flex-col gap-14 lg:mt-8 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:pr-[30vw]"
      >
        {featured.map((c, i) => (
          <TLink
            key={c.slug}
            href={`/catalogo?categoria=${c.slug}`}
            className="group relative block lg:w-[34vw] xl:w-[28vw]"
            aria-label={`${c.number}. ${c.name}: ${c.short}`}
          >
            <div className={`relative aspect-[4/5] overflow-hidden lg:aspect-[4/3.4] ${i % 2 ? "lg:mt-10" : ""}`}>
              <div className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                <SceneArt scene={c.scene} alt="" className="h-full w-full" />
              </div>
              <span className="absolute left-0 top-0 bg-ink px-3 py-2 text-xs font-extrabold tracking-[0.2em] text-paper">{c.number}</span>
              <span
                aria-hidden
                className="absolute bottom-0 right-0 grid h-14 w-14 translate-y-full place-items-center bg-scarlet text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
              >
                <ArrowIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-paper/15 pb-4">
              <h3 className="display text-5xl text-paper transition-colors group-hover:text-stone-2 md:text-6xl">{c.name}</h3>
              <span aria-hidden className="display text-2xl text-paper/30">
                {c.number}
              </span>
            </div>
            <p className="mt-3 max-w-sm text-paper/75">{c.short}</p>
          </TLink>
        ))}
      </div>

      <div aria-hidden className="container-x mt-10 hidden lg:block">
        <div className="h-0.5 w-full bg-paper/10">
          <div data-rail-progress className="h-full origin-left scale-x-0 bg-scarlet" />
        </div>
      </div>
    </section>
  );
}
