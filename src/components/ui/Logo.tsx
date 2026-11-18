/** Logotipo tipográfico: "relevo." en minúsculas con punto Scarlet Red. */
export function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const fg = tone === "light" ? "text-paper" : "text-ink";
  return (
    <span className={`inline-flex items-baseline font-sans text-[1.7rem] font-extrabold leading-none tracking-[-0.04em] ${fg} ${className}`}>
      relevo<span className="text-scarlet">.</span>
    </span>
  );
}
