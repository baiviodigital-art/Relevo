"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, UserRound, Menu, X } from "lucide-react";
import { TLink } from "@/components/motion/TLink";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/lib/site";
import { useCart } from "@/lib/cart/store";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const items = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const badge = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(items.length);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animación del contador al añadir servicios
  useEffect(() => {
    if (items.length > prevCount.current && badge.current && !prefersReducedMotion()) {
      gsap.fromTo(badge.current, { scale: 1.8 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    }
    prevCount.current = items.length;
  }, [items.length]);

  // Cerrar menú al navegar (ajuste de estado al cambiar la ruta, sin efecto)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } bg-ink ${scrolled || open ? "border-b border-paper/10" : "border-b border-transparent"}`}
      >
        <nav aria-label="Principal" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <TLink href="/" aria-label="Relevo, ir al inicio" className="shrink-0">
            <Logo />
          </TLink>

          <ul className="hidden items-center gap-7 lg:flex">
            {mainNav.slice(1).map((l) => (
              <li key={l.href}>
                <TLink
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="relative py-2 text-sm font-semibold text-paper/85 transition-colors hover:text-paper aria-[current=page]:text-paper"
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-scarlet transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      isActive(l.href) ? "w-full" : "w-0"
                    }`}
                  />
                </TLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <TLink href="/profesionales" className="link-underline hidden text-sm font-semibold text-stone-2 xl:inline">
              Soy profesional
            </TLink>
            <TLink href="/mi-cuenta" aria-label="Mi cuenta" className="grid h-11 w-11 place-items-center text-paper hover:text-stone-2">
              <UserRound className="h-5 w-5" aria-hidden />
            </TLink>
            <TLink
              href="/carrito"
              aria-label={`Carrito, ${items.length} ${items.length === 1 ? "servicio" : "servicios"}`}
              className="relative grid h-11 w-11 place-items-center text-paper hover:text-stone-2"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              <span
                ref={badge}
                aria-hidden
                className={`absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-scarlet px-1 text-[11px] font-bold leading-none text-white ${
                  items.length ? "" : "hidden"
                }`}
              >
                {items.length}
              </span>
            </TLink>
            <TLink
              href="/catalogo"
              className="ml-2 hidden min-h-11 items-center bg-scarlet px-5 text-[0.95rem] font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-[#d5262a] md:inline-flex"
            >
              Contratar
            </TLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="grid h-11 w-11 place-items-center text-paper lg:hidden"
            >
              {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
