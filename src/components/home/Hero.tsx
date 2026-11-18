"use client";

import { useRef } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TLink } from "@/components/motion/TLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { SceneArt } from "@/components/ui/SceneArt";
import { DrawnArrow } from "@/components/ui/Arrow";
import { Marquee } from "@/components/ui/Marquee";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Hero editorial a dos áreas (referencia: maqueta de Pablo).
 * Izquierda: Egyptian Blue + titular masivo; derecha: imagen a sangre + bloque Stone Blue.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.5 });
      tl.from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 })
        .fromTo("[data-hero-stone]", { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 100%", duration: 1.1, ease: "expo.inOut" }, 0.2)
        .fromTo("[data-hero-arrow]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.inOut" }, 1);
      gsap.to("[data-hero-img] > *", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        {/* Área izquierda */}
        <div className="flex flex-col justify-between px-[var(--gutter)] pb-10 pt-[calc(var(--nav-h)+2rem)] lg:pb-12">
          <p data-hero-fade className="eyebrow text-stone-2">
            01 / Servicios para viviendas vacacionales
          </p>

          <SplitWords
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.45}
            lines={["Tu", "vivienda.", "*Nuestro*", "*relevo.*"]}
            className="display my-10 text-[20vw] leading-[0.88] text-paper sm:text-[17vw] lg:my-4 lg:text-[min(9.4vw,10.5rem)]"
          />

          <div className="space-y-8">
            <p data-hero-fade className="max-w-lg text-lg leading-relaxed text-paper/85 md:text-xl">
              Limpieza, mantenimiento y preparación de tu vivienda vacacional. Todo desde una única plataforma, estés donde estés.
            </p>
            <div data-hero-fade className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Magnetic strength={0.12}>
                <TLink
                  href="/catalogo"
                  className="group flex min-h-16 w-full items-center justify-between gap-10 bg-scarlet px-6 text-[1.1875rem] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#d5262a] sm:w-auto sm:min-w-[22rem]"
                >
                  Explorar servicios
                  <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden fill="none">
                    <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
                  </svg>
                </TLink>
              </Magnetic>
              <TLink href="/como-funciona" className="link-underline self-start px-1 py-2 font-bold uppercase tracking-[0.06em] text-paper sm:self-auto">
                Cómo funciona
              </TLink>
            </div>
          </div>
        </div>

        {/* Área derecha */}
        <div className="relative grid min-h-[80svh] grid-rows-[1fr_auto] lg:min-h-0 lg:pt-[var(--nav-h)]">
          <ImageReveal onLoad direction="up" parallax={false} className="relative min-h-[56svh]">
            <div data-hero-img className="absolute inset-0 -top-[6%] h-[112%]">
              <SceneArt
                scene="hero"
                alt="Composición gráfica de una vivienda vacacional canaria con piscina frente al mar"
                priority
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
          <div data-hero-stone className="relative flex min-h-44 flex-col justify-between bg-stone px-6 py-6 text-ink md:px-8">
            <p data-hero-fade className="eyebrow text-[0.95rem]">Estés donde estés.</p>
            <span data-hero-arrow aria-hidden className="ml-auto mr-[12%] block text-scarlet">
              <DrawnArrow direction="right" className="h-16 w-36 rotate-[18deg]" />
            </span>
            <span aria-hidden className="vertical-text eyebrow absolute right-3 top-6 hidden text-ink/60 xl:block">
              28°N · 15°O
            </span>
          </div>
        </div>
      </div>

      <div className="on-scarlet bg-scarlet py-4 text-ink md:py-5">
        <Marquee items={["Limpieza", "Mantenimiento", "Check-in", "Lavandería", "Reposición", "Piscina", "Jardinería"]} className="text-4xl md:text-6xl" />
      </div>
    </section>
  );
}
