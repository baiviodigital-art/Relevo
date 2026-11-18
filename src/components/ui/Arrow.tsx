/** Flecha dibujada a mano alzada (trazo editorial). Hereda el color del texto. */
export function DrawnArrow({ className = "", direction = "right" }: { className?: string; direction?: "right" | "down" | "down-right" }) {
  const rot = { right: 0, down: 90, "down-right": 45 }[direction];
  return (
    <svg viewBox="0 0 120 60" className={className} style={{ transform: `rotate(${rot}deg)` }} aria-hidden fill="none">
      <path d="M4 38 C 30 20, 62 46, 104 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M86 14 L106 27 L90 46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Flecha geométrica para botones; se desplaza en hover mediante la clase group. */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 ${className}`} aria-hidden fill="none">
      <path d="M3 12h17M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}
