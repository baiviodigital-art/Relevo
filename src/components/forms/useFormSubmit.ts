"use client";

import { useRef, useState } from "react";

export type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; reason: "validation" | "not_configured" | "rate_limited" | "provider_error" | "network" };

/** Convierte el formulario a JSON (casillas múltiples → arrays) y lo envía al endpoint. */
export function useFormSubmit(endpoint: string, multi: string[] = []) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef<number>(0);

  const markStart = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body: Record<string, unknown> = {};
    for (const [k, v] of fd.entries()) {
      if (multi.includes(k)) body[k] = [...((body[k] as string[]) || []), String(v)];
      else body[k] = String(v);
    }
    body.privacy = fd.get("privacy") === "on";
    body.startedAt = startedAt.current || Date.now();

    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: "success" });
        form.reset();
        return;
      }
      if (res.status === 422) {
        setErrors(json.fields || {});
        setStatus({ kind: "error", reason: "validation" });
        const first = form.querySelector<HTMLElement>("[aria-invalid=true]");
        first?.focus();
        return;
      }
      setStatus({ kind: "error", reason: json.error || "provider_error" });
    } catch {
      setStatus({ kind: "error", reason: "network" });
    }
  }

  return { status, errors, onSubmit, markStart };
}
