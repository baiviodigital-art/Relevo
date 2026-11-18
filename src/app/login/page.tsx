import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Iniciar sesión", robots: { index: false } };

export default function LoginPage() {
  return (
    <ComingSoon
      eyebrow="Acceso"
      lines={["Iniciar", "*sesión.*"]}
      phase="fase 3 (autenticación con Supabase)"
      what={["Acceso con email y contraseña", "Recuperación de contraseña", "Sesiones seguras gestionadas en servidor"]}
      next={{ href: "/registro", label: "Crear cuenta" }}
    />
  );
}
