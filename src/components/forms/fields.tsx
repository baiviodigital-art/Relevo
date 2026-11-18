"use client";

import { useId } from "react";

const base =
  "mt-2 w-full border-0 border-b-2 border-ink/25 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus:ring-0 aria-[invalid=true]:border-scarlet";

export function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className="mt-2 text-sm font-semibold text-[#b5161a]">
      {msg}
    </p>
  ) : null;
}

export function TextField({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink/75">
        {label} {optional && <span className="normal-case tracking-normal text-ink/55">(opcional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-e` : undefined}
        className={base}
      />
      <FieldError id={`${id}-e`} msg={error} />
    </div>
  );
}

export function SelectField({ label, name, options, error, required }: { label: string; name: string; options: readonly string[]; error?: string; required?: boolean }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink/75">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-e` : undefined}
        className={`${base} cursor-pointer`}
      >
        <option value="" disabled>
          Selecciona…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-e`} msg={error} />
    </div>
  );
}

export function TextArea({ label, name, error, required, optional }: { label: string; name: string; error?: string; required?: boolean; optional?: boolean }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink/75">
        {label} {optional && <span className="normal-case tracking-normal text-ink/55">(opcional)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-e` : undefined}
        className={`${base} resize-y`}
      />
      <FieldError id={`${id}-e`} msg={error} />
    </div>
  );
}

/** Grupo de casillas con aspecto de "chips". */
export function ChipGroup({ legend, name, options, error }: { legend: string; name: string; options: readonly string[]; error?: string }) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-e` : undefined}>
      <legend className="eyebrow text-ink/75">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="checkbox" name={name} value={o} className="peer sr-only" />
            <span className="inline-flex min-h-11 items-center border-2 border-ink/20 px-4 text-sm font-bold text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-scarlet hover:border-ink">
              {o}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={`${id}-e`} msg={error} />
    </fieldset>
  );
}

export function PrivacyCheck({ error }: { error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink/80">
        <input id={id} name="privacy" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#03203D]" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : undefined} />
        <span>
          He leído y acepto la{" "}
          <a href="/legal/privacidad" target="_blank" className="font-bold underline underline-offset-2">
            política de privacidad
          </a>
          . Usaremos tus datos solo para responder a esta solicitud.
        </span>
      </label>
      <FieldError id={`${id}-e`} msg={error} />
    </div>
  );
}

/** Campo trampa para bots: invisible para personas y lectores de pantalla. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
      <label>
        No rellenar
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
