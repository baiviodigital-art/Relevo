"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Revela los hijos marcados con [data-reveal] al entrar en pantalla, con escalonado.
 * Si no hay hijos marcados, revela el contenedor completo.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 40,
  stagger = 0.08,
  start = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "article";
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const items = ref.current.querySelectorAll("[data-reveal]");
      const targets = items.length ? items : [ref.current];
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
