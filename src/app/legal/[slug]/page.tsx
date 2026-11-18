import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegal, legalDocs } from "@/data/legal";
import { Notice } from "@/components/ui/Notice";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getLegal(slug);
  return d ? { title: d.title, alternates: { canonical: `/legal/${d.slug}` } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegal(slug);
  if (!doc) notFound();
  return (
    <article className="bg-paper pb-24 pt-[calc(var(--nav-h)+3rem)] text-ink">
      <div className="container-x max-w-4xl">
        <p className="eyebrow text-ink/70">Legal</p>
        <h1 className="display mt-4 text-[13vw] sm:text-7xl md:text-8xl">{doc.title}</h1>
        <Notice tone="light" className="mt-8">
          Borrador pendiente de revisión profesional. Los datos marcados como [PENDIENTE] se completarán cuando la sociedad esté constituida.
        </Notice>
        <div className="mt-12 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-extrabold">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-3 max-w-prose text-lg leading-relaxed text-ink/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
