"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Revelado de imagen con máscara (clip-path) + ligero parallax interno. */
export function ImageReveal({
  children,
  className = "",
  direction = "up",
  parallax = true,
  onLoad = false,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  parallax?: boolean;
  onLoad?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const inner = ref.current.firstElementChild as HTMLElement | null;
      const from = {
        up: "inset(100% 0% 0% 0%)",
        left: "inset(0% 100% 0% 0%)",
        right: "inset(0% 0% 0% 100%)",
      }[direction];
      gsap.fromTo(
        ref.current,
        { clipPath: from },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          delay: onLoad ? 0.2 : 0,
          ...(onLoad ? {} : { scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }),
        },
      );
      if (inner) gsap.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out", delay: onLoad ? 0.2 : 0, ...(onLoad ? {} : { scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }) });
      if (parallax && inner) {
        gsap.to(inner, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
