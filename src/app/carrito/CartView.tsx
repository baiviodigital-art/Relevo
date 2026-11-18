"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart, cart } from "@/lib/cart/store";
import { formatEUR } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";

export function CartView() {
  const items = useCart();
  const total = items.reduce((a, b) => a + b.demoPrice, 0);
  return (
    <section className="min-h-[80svh] bg-paper pb-24 pt-[calc(var(--nav-h)+3rem)] text-ink">
      <div className="container-x">
        <h1 className="display text-[18vw] sm:text-[12vw] lg:text-[8vw]">Carrito</h1>
        <Notice tone="light" className="mt-6 max-w-3xl">
          El carrito completo (configuraciones, extras, códigos promocionales y pago) se activa en las fases 2 y 3. Ahora mismo no se puede pagar.
        </Notice>
        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-start gap-6 border-t-2 border-ink pt-12">
            <ShoppingBag className="h-10 w-10 text-stone" aria-hidden />
            <p className="text-2xl font-extrabold">Tu carrito está vacío.</p>
            <Button href="/catalogo">Explorar servicios</Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <ul className="divide-y divide-ink/15 border-y-2 border-ink lg:col-span-8">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-4 py-5">
                  <span className="text-lg font-bold">{i.name}</span>
                  <span className="flex items-center gap-4">
                    {formatEUR(i.demoPrice)}
                    <button type="button" onClick={() => cart.remove(i.id)} aria-label={`Eliminar ${i.name}`} className="grid h-11 w-11 place-items-center hover:text-scarlet">
                      <Trash2 className="h-5 w-5" aria-hidden />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-4">
              <p className="flex justify-between text-xl font-extrabold">
                <span>Total (demo)</span>
                <span>{formatEUR(total)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
