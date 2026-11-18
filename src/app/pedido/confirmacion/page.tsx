import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Confirmación de pedido", robots: { index: false } };

export default function ConfirmacionPage() {
  return (
    <ComingSoon
      eyebrow="Pedido"
      lines={["Confirma*ción.*"]}
      phase="fase 3 (backend y pagos)"
      what={["Resumen del pedido pagado", "Estado de la fecha: solicitada o confirmada", "Correo de confirmación", "Acceso al seguimiento desde Mi cuenta"]}
    />
  );
}
