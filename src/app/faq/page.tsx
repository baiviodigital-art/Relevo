import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas sobre cobertura, precios, pagos, fechas y profesionales en Relevo.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero eyebrow="Preguntas frecuentes" lines={["Sin letra", "*pequeña.*"]} />
      <section className="bg-paper py-20 text-ink md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ul className="border-t-2 border-ink">
              {faq.map((f, i) => (
                <li key={f.q} className="border-b border-ink/15">
                  <details className="group" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-xl font-extrabold md:text-2xl [&::-webkit-details-marker]:hidden">
                      <span>{f.q}</span>
                      <Plus className="mt-1 h-6 w-6 shrink-0 text-scarlet transition-transform duration-300 group-open:rotate-45" aria-hidden />
                    </summary>
                    <p className="max-w-2xl pb-8 text-lg leading-relaxed text-ink/80">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-3 lg:col-start-10">
            <p className="text-lg font-bold">¿No encuentras tu respuesta?</p>
            <div className="mt-6">
              <Button href="/contacto">Contactar</Button>
            </div>
          </aside>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
