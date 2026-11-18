"use client";

import { AVAILABILITY, SPECIALTIES, ZONES } from "@/lib/validation";
import { ChipGroup, Honeypot, PrivacyCheck, SelectField, TextArea, TextField } from "./fields";
import { FormStatus } from "./FormStatus";
import { useFormSubmit } from "./useFormSubmit";
import { ArrowIcon } from "@/components/ui/Arrow";

export function ProForm() {
  const { status, errors, onSubmit, markStart } = useFormSubmit("/api/professionals", ["specialties", "zones", "availability"]);
  return (
    <form onSubmit={onSubmit} onFocus={markStart} noValidate className="relative space-y-10">
      <Honeypot />
      <div className="grid gap-8 md:grid-cols-3">
        <TextField label="Nombre o empresa" name="name" autoComplete="name" required error={errors.name} />
        <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
        <TextField label="Teléfono" name="phone" type="tel" autoComplete="tel" required error={errors.phone} />
      </div>
      <ChipGroup legend="Especialidad" name="specialties" options={SPECIALTIES} error={errors.specialties} />
      <SelectField label="Experiencia" name="experience" options={["Menos de 1 año", "1 a 3 años", "3 a 10 años", "Más de 10 años"]} required error={errors.experience} />
      <ChipGroup legend="Zona de trabajo" name="zones" options={ZONES} error={errors.zones} />
      <ChipGroup legend="Disponibilidad" name="availability" options={AVAILABILITY} error={errors.availability} />
      <TextArea label="Algo más que debamos saber" name="message" optional error={errors.message} />
      <PrivacyCheck error={errors.privacy} />
      <FormStatus status={status} successText="Solicitud recibida. Te contactaremos cuando abramos la selección para el piloto." />
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="group inline-flex min-h-14 items-center gap-3 bg-ink px-8 text-[1.1875rem] font-extrabold uppercase tracking-wide text-paper transition-colors hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70"
      >
        {status.kind === "sending" ? "Enviando…" : "Enviar solicitud"}
        <ArrowIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
