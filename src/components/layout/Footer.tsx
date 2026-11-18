import { TLink } from "@/components/motion/TLink";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/data/services";
import { legalNav, mainNav, site, whatsappHref } from "@/lib/site";
import { locales } from "@/lib/i18n";

export function Footer() {
  const social = site.social.filter((s) => s.href);
  const wa = whatsappHref("Hola, quiero información sobre Relevo");
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x grid gap-12 border-t border-paper/10 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/75">
            Plataforma de contratación y coordinación de servicios para viviendas vacacionales en Canarias. No comercializamos alojamientos: nos ocupamos
            de que funcionen.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2" aria-label="Idioma">
            {locales.map((l) => (
              <span
                key={l.code}
                title={l.available ? l.name : `${l.name}: próximamente`}
                aria-disabled={!l.available}
                className={`border px-2.5 py-1 text-xs font-bold ${l.available ? "border-paper text-paper" : "border-paper/20 text-paper/45"}`}
              >
                {l.label}
                {!l.available && <span className="sr-only"> (próximamente)</span>}
              </span>
            ))}
          </div>
        </div>

        <FooterCol title="Navegación" className="md:col-span-2">
          {[...mainNav, { label: "Preguntas frecuentes", href: "/faq" }, { label: "Profesionales", href: "/profesionales" }].map((l) => (
            <li key={l.href}>
              <TLink href={l.href} className="link-underline">
                {l.label}
              </TLink>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Servicios" className="md:col-span-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <TLink href={`/catalogo?categoria=${c.slug}`} className="link-underline">
                {c.name}
              </TLink>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contacto" className="md:col-span-3">
          <li>
            <TLink href="/contacto" className="link-underline">
              Formulario de contacto
            </TLink>
          </li>
          {site.contact.email && (
            <li>
              <a href={`mailto:${site.contact.email}`} className="link-underline">
                {site.contact.email}
              </a>
            </li>
          )}
          {wa && (
            <li>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline">
                WhatsApp
              </a>
            </li>
          )}
          {social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                {s.label}
              </a>
            </li>
          ))}
          <li className="pt-2 text-paper/60">Gran Canaria · Islas Canarias</li>
        </FooterCol>
      </div>

      <div aria-hidden className="container-x select-none">
        <p className="display translate-y-[12%] text-center text-[27vw] leading-[0.75] text-paper/[0.06]">Relevo</p>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-paper/65 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Relevo · Proyecto en fase de validación. Datos fiscales pendientes de constitución.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <TLink href={l.href} className="link-underline">
                  {l.label}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 text-stone-2">{title}</h2>
      <ul className="space-y-2.5 text-sm text-paper/85">{children}</ul>
    </div>
  );
}
