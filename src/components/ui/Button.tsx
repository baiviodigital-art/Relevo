import { TLink } from "@/components/motion/TLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowIcon } from "./Arrow";

type Variant = "primary" | "ghost" | "ink" | "paper";

const styles: Record<Variant, string> = {
  // Rojo: única llamada principal por bloque. Texto blanco sobre #EB2F33 = 4.0:1 → se usa ≥18.66px bold (texto grande AA).
  primary: "bg-scarlet text-white hover:bg-[#d5262a]",
  ghost: "border-2 border-current text-current hover:bg-paper hover:text-ink",
  ink: "bg-ink text-paper hover:bg-ink-2",
  paper: "bg-paper text-ink hover:bg-white",
};

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
  arrow?: boolean;
}

export function Button({ href, children, variant = "primary", magnetic = true, className = "", arrow = true }: Props) {
  const el = (
    <TLink
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3.5 text-[1.1875rem] font-extrabold uppercase tracking-[0.04em] transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && <ArrowIcon className="h-5 w-5" />}
    </TLink>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
