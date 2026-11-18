import { SplitWords } from "@/components/motion/SplitWords";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ProsSection() {
  return (
    <section aria-labelledby="pros-title" className="overflow-hidden bg-paper pt-24 text-ink md:pt-36">
      <div className="container-x">
        <SectionLabel n="08">Profesionales</SectionLabel>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitWords
            id="pros-title"
            lines={["Tu talento.", "Nuestra *red.*"]}
            className="display text-[16vw] sm:text-[12vw] lg:col-span-8 lg:text-[8.4vw]"
          />
          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink/80">
              Limpieza, mantenimiento, lavandería, jardinería o piscinas. Si trabajas en el sur de Gran Canaria, cuéntanos qué haces: buscamos
              profesionales para el piloto. Encargos organizados, cobros claros y una reputación que se construye con cada trabajo.
            </p>
            <p className="mt-3 text-sm text-ink/70">No prometemos un volumen de trabajo que todavía no podemos demostrar.</p>
            <div className="mt-8">
              <Button href="/profesionales" variant="ink">
                Quiero colaborar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 border-t-2 border-ink py-6 text-ink/90">
        <Marquee
          reverse
          duration={46}
          items={["Limpieza", "Fontanería", "Electricidad", "Lavandería", "Jardinería", "Piscinas", "Check-in"]}
          className="text-4xl md:text-6xl"
        />
      </div>
    </section>
  );
}
