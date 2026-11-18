import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Registro", robots: { index: false } };

export default function RegistroPage() {
  return (
    <ComingSoon
      eyebrow="Registro"
      lines={["Crea tu", "*cuenta.*"]}
      phase="fase 3 (autenticación con Supabase)"
      what={["Registro de propietarios y gestores", "Verificación de email", "Usuarios autorizados por vivienda (familias, gestores)"]}
      next={{ href: "/login", label: "Ya tengo cuenta" }}
    />
  );
}
