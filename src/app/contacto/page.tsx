import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { SplitWords } from "@/components/motion/SplitWords";
import { ContactForm } from "@/components/forms/ContactForm";
import { DrawnArrow } from "@/components/ui/Arrow";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contactar",
  description: "Escríbenos para resolver dudas sobre los servicios de Relevo para viviendas vacacionales en Canarias.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  const wa = whatsappHref("Hola, quiero información sobre Relevo");
  return (
    <section className="grid min-h-[100svh] lg:grid-cols-12">
      <div className="relative flex flex-col justify-between bg-ink px-[var(--gutter)] pb-12 pt-[calc(var(--nav-h)+3rem)] lg:col-span-5">
        <div>
          <p className="eyebrow flex items-center gap-3 text-stone-2">
            <span className="inline-block h-2 w-2 bg-scarlet" aria-hidden />
            Contactar
          </p>
          <SplitWords as="h1" trigger="load" delay={0.35} lines={["Hable*mos.*"]} className="display mt-6 text-[22vw] text-paper lg:text-[8.2vw]" />
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-paper/80">
            Propietario, gestor o profesional: cuéntanos qué necesitas. Respondemos por email.
          </p>
          <DrawnArrow className="mt-10 hidden h-16 w-32 text-scarlet lg:block" />
        </div>
        {(site.contact.email || wa) && (
          <ul className="mt-12 space-y-3">
            {site.contact.email && (
              <li>
                <a href={`mailto:${site.contact.email}`} className="group inline-flex items-center gap-3 text-lg font-bold text-paper">
                  <Mail className="h-5 w-5 text-stone-2" aria-hidden />
                  <span className="link-underline">{site.contact.email}</span>
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-lg font-bold text-paper">
                  <MessageCircle className="h-5 w-5 text-stone-2" aria-hidden />
                  <span className="link-underline">WhatsApp</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="bg-paper px-[var(--gutter)] py-16 lg:col-span-7 lg:pt-[calc(var(--nav-h)+3rem)]">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
