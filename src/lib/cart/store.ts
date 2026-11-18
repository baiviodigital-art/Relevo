"use client";

import { useSyncExternalStore } from "react";

/**
 * Carrito persistente en localStorage (base de la fase 2).
 * En la fase 3 el precio se recalcula siempre en servidor antes de crear la sesión de Stripe:
 * lo guardado aquí nunca se considera fiable para cobrar.
 */
export interface CartItem {
  id: string;
  serviceSlug: string;
  name: string;
  demoPrice: number;
  config: Record<string, string | number | string[]>;
}

const KEY = "relevo.cart.v1";
const listeners = new Set<() => void>();
let cache: CartItem[] | null = null;
const EMPTY: CartItem[] = [];

function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* almacenamiento no disponible: el carrito vive solo en memoria */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export const cart = {
  add: (item: Omit<CartItem, "id">) => write([...read(), { ...item, id: crypto.randomUUID() }]),
  remove: (id: string) => write(read().filter((i) => i.id !== id)),
  clear: () => write([]),
};

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
