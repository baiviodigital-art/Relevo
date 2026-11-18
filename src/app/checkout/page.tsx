import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Pago", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <ComingSoon
      eyebrow="Pasarela de pago"
      lines={["Pago", "*seguro.*"]}
      phase="fase 3 (backend y pagos)"
      what={[
        "Stripe Checkout en modo de pruebas, con sesión creada en el servidor",
        "Precio recalculado en el backend, nunca el del navegador",
        "Confirmación por webhook verificado y prevención de pedidos duplicados",
        "Ningún dato de tarjeta pasa por los servidores de Relevo",
      ]}
    />
  );
}
