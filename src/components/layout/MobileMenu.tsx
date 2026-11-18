"use client";

import { useEffect, useRef } from "react";
import { TLink } from "@/components/motion/TLink";
import { mainNav } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.7, ease: "expo.inOut" });
      gsap.fromTo(
        el.querySelectorAll("[data-item]"),
        { yPercent: 100 },
        { yPercent: 0, duration: reduce ? 0 : 0.9, ease: "expo.out", stagger: 0.05, delay: reduce ? 0 : 0.25 },
      );
      el.querySelector<HTMLElement>("a")?.focus();
    } else {
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduce ? 0 : 0.5,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
        },
      });
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[var(--gutter)] pb-8 pt-[calc(var(--nav-h)+2rem)] lg:hidden"
    >
      <ul className="space-y-1">
        {[...mainNav, { label: "Profesionales", href: "/profesionales" }, { label: "Mi cuenta", href: "/mi-cuenta" }].map((l, i) => (
          <li key={l.href} className="overflow-hidden">
            <TLink href={l.href} data-item className="display flex items-baseline gap-3 py-1 text-[13vw] leading-[0.95] text-paper sm:text-7xl">
              <span className="font-sans text-xs font-bold text-stone-2" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
            </TLink>
          </li>
        ))}
      </ul>
      <TLink href="/catalogo" className="flex min-h-14 items-center justify-center bg-scarlet text-lg font-extrabold uppercase tracking-wide text-white">
        Contratar un servicio
      </TLink>
    </div>
  );
}
