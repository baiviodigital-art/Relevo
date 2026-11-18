"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Transiciones entre páginas mediante cortinas de color (rojo + azul oscuro).
 * - Salida: las cortinas suben y cubren la pantalla; después se navega.
 * - Entrada: al cambiar la ruta, las cortinas se retiran hacia arriba.
 * Con prefers-reduced-motion se navega sin animación.
 */

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const red = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const covering = useRef(false);
  const fallback = useRef<number | undefined>(undefined);

  const reveal = useCallback(() => {
    window.clearTimeout(fallback.current);
    if (!covering.current) return;
    covering.current = false;
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.to(label.current, { autoAlpha: 0, duration: 0.2 })
      .to(ink.current, { scaleY: 0, transformOrigin: "50% 0%", duration: 0.7 }, "<")
      .to(red.current, { scaleY: 0, transformOrigin: "50% 0%", duration: 0.7 }, "<0.08")
      .set([ink.current, red.current], { visibility: "hidden" });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const target = new URL(href, window.location.href);
      if (target.pathname === window.location.pathname && target.search === window.location.search) {
        if (target.hash) document.querySelector(target.hash)?.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (prefersReducedMotion() || covering.current) {
        router.push(href);
        return;
      }
      covering.current = true;
      router.prefetch(href);
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          router.push(href);
          // Si la navegación no cambia de ruta (o tarda demasiado), se retira la cortina igualmente.
          fallback.current = window.setTimeout(reveal, 2500);
        },
      });
      tl.set([red.current, ink.current], { visibility: "visible", scaleY: 0, transformOrigin: "50% 100%" })
        .to(red.current, { scaleY: 1, duration: 0.55 })
        .to(ink.current, { scaleY: 1, duration: 0.6 }, "<0.1")
        .fromTo(label.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.2");
    },
    [reveal, router],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    // Pequeño margen para que la nueva página pinte antes de retirar la cortina.
    const id = window.setTimeout(reveal, 60);
    return () => window.clearTimeout(id);
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
        <div ref={red} className="invisible absolute inset-0 bg-scarlet" />
        <div ref={ink} className="invisible absolute inset-0 flex items-center justify-center bg-ink">
          <span ref={label} className="display invisible text-[18vw] text-paper/10 md:text-[12vw]">
            Relevo
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
