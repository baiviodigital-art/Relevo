import { SplitWords } from "@/components/motion/SplitWords";
import { Button } from "@/components/ui/Button";
import { DrawnArrow } from "@/components/ui/Arrow";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-scarlet relative overflow-hidden bg-scarlet py-24 text-white md:py-40">
      <div className="container-x relative">
        <SplitWords
          id="cta-title"
          lines={["Tú descansa.", "Nosotros tomamos", "el relevo."]}
          className="display text-[15vw] text-white sm:text-[12vw] lg:text-[9.5vw]"
        />
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Button href="/catalogo" variant="ink">
            Contratar un servicio
          </Button>
          <span aria-hidden className="hidden rotate-180 text-ink md:block">
            <DrawnArrow className="h-16 w-32" />
          </span>
        </div>
        <span aria-hidden className="vertical-text eyebrow absolute right-[var(--gutter)] top-0 hidden text-white/70 md:block">
          Relevo · Canarias
        </span>
      </div>
    </section>
  );
}
