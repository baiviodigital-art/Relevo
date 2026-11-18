import { PageHero } from "./PageHero";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";

/** Página de una función que pertenece a una fase posterior. Explica qué hay y qué falta. */
export function ComingSoon({
  eyebrow,
  lines,
  phase,
  what,
  next = { href: "/catalogo", label: "Ver el catálogo" },
}: {
  eyebrow: string;
  lines: string[];
  phase: string;
  what: string[];
  next?: { href: string; label: string };
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} lines={lines} />
      <section className="bg-paper py-20 text-ink">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Notice tone="light">
              Esta sección forma parte de la <strong>{phase}</strong> del proyecto y todavía no está activa. No se procesan datos ni pagos aquí.
            </Notice>
            <h2 className="mt-10 text-2xl font-extrabold">Qué incluirá</h2>
            <ul className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
              {what.map((w) => (
                <li key={w} className="py-3 text-lg">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Button href={next.href}>{next.label}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
