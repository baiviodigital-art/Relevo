import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Mi cuenta", robots: { index: false } };

export default function MiCuentaPage() {
  return (
    <ComingSoon
      eyebrow="Área privada"
      lines={["Mi", "*cuenta.*"]}
      phase="fase 4 (plataforma de gestión)"
      what={[
        "Mis viviendas y usuarios autorizados",
        "Próximos servicios, calendario e historial",
        "Fotografías de cada trabajo",
        "Estado de pedidos e incidencias",
        "Facturación con IGIC",
        "Configuración del perfil",
      ]}
      next={{ href: "/login", label: "Iniciar sesión" }}
    />
  );
}
