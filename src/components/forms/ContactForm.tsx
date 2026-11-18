"use client";

import { CLIENT_TYPES, CONTACT_REASONS } from "@/lib/validation";
import { Honeypot, PrivacyCheck, SelectField, TextArea, TextField } from "./fields";
import { FormStatus } from "./FormStatus";
import { useFormSubmit } from "./useFormSubmit";
import { ArrowIcon } from "@/components/ui/Arrow";

export function ContactForm() {
  const { status, errors, onSubmit, markStart } = useFormSubmit("/api/contact");
  return (
    <form onSubmit={onSubmit} onFocus={markStart} noValidate className="relative space-y-8">
      <Honeypot />
      <div className="grid gap-8 md:grid-cols-2">
        <TextField label="Nombre" name="name" autoComplete="name" required error={errors.name} />
        <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
        <TextField label="Teléfono" name="phone" type="tel" autoComplete="tel" optional error={errors.phone} />
        <SelectField label="Tipo de cliente" name="clientType" options={CLIENT_TYPES} required error={errors.clientType} />
      </div>
      <SelectField label="Motivo de contacto" name="reason" options={CONTACT_REASONS} required error={errors.reason} />
      <TextArea label="Mensaje" name="message" required error={errors.message} />
      <PrivacyCheck error={errors.privacy} />
      <FormStatus status={status} successText="Mensaje enviado. Te responderemos por email lo antes posible." />
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="group inline-flex min-h-14 items-center gap-3 bg-scarlet px-8 text-[1.1875rem] font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-[#d5262a] disabled:cursor-wait disabled:opacity-70"
      >
        {status.kind === "sending" ? "Enviando…" : "Enviar mensaje"}
        <ArrowIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
