"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Tipografía cinética: cada palabra sube desde una máscara.
 * Las palabras entre *asteriscos* se pintan en Scarlet Red.
 * Usa `lines` para forzar saltos de línea editoriales.
 * El texto completo se expone a lectores de pantalla mediante aria-label.
 */
export function SplitWords({
  lines,
  as: Tag = "h2",
  className = "",
  trigger = "scroll",
  delay = 0,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  trigger?: "scroll" | "load";
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const plain = lines.join(" ").replace(/\*/g, "");

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current.querySelectorAll("[data-word]"), {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        delay,
        ...(trigger === "scroll" ? { scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } } : {}),
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} aria-label={plain}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.split(" ").map((word, wi) => {
            const hot = word.startsWith("*");
            const clean = word.replace(/\*/g, "");
            return (
              <Fragment key={wi}>
                <span className="-mt-[0.18em] inline-block overflow-hidden pb-[0.06em] pt-[0.18em] align-bottom">
                  <span data-word className={`inline-block will-change-transform ${hot ? "text-scarlet" : ""}`}>
                    {clean}
                  </span>
                </span>
                {wi < line.split(" ").length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
