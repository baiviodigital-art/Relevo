"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./TransitionProvider";

type Props = ComponentProps<typeof Link> & { href: string };

/** Enlace interno con transición de cortina. Respeta ctrl/cmd-clic, rueda y target=_blank. */
export function TLink({ href, onClick, target, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!href.startsWith("/")) return;
    e.preventDefault();
    navigate(href);
  };
  return <Link href={href} target={target} onClick={handle} {...rest} />;
}
