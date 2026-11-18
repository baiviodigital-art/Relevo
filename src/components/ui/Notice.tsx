import { Info } from "lucide-react";

/** Aviso honesto de estado (demo, borrador, función no disponible). */
export function Notice({ children, tone = "dark", className = "" }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  const t = tone === "dark" ? "border-stone/50 text-paper/85 bg-ink-2" : "border-ink/20 text-ink bg-white";
  return (
    <p role="note" className={`flex items-start gap-3 border-l-4 border-l-scarlet ${t} border px-4 py-3 text-sm leading-relaxed ${className}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-scarlet" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
