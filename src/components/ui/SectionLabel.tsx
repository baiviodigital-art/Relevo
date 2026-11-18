/**
 * Etiqueta editorial de sección: "02 / Nombre".
 * Sobre fondos oscuros usa Stone Blue claro; sobre claros, Egyptian Blue (Stone Blue sobre blanco roto no alcanza AA).
 */
export function SectionLabel({ n, children, className = "", dark = false }: { n: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-4 ${dark ? "text-stone-2" : "text-ink/75"} ${className}`}>
      <span>
        {n} / {children}
      </span>
      <span className="h-px flex-1 bg-current opacity-30" aria-hidden />
    </div>
  );
}
