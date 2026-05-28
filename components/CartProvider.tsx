"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { menuItems, type CartLine, type MenuItem } from "@/data/menu";

type StoredCartLine = {
  id: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  total: number;
  count: number;
  addItem: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "zynger-club-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (!raw) {
          setHydrated(true);
          return;
        }

        const stored = JSON.parse(raw) as StoredCartLine[];
        const restored = stored
          .map((line) => {
            const item = menuItems.find((candidate) => candidate.id === line.id);
            return item && line.quantity > 0 ? { item, quantity: line.quantity } : null;
          })
          .filter((line): line is CartLine => Boolean(line));

        setLines(restored);
      } catch {
        setLines([]);
      } finally {
        setHydrated(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const stored: StoredCartLine[] = lines.map((line) => ({ id: line.item.id, quantity: line.quantity }));
    window.localStorage.setItem(storageKey, JSON.stringify(stored));
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(() => {
    const total = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);

    return {
      lines,
      total,
      count,
      addItem(item) {
        setLines((current) => {
          const existing = current.find((line) => line.item.id === item.id);
          if (existing) {
            return current.map((line) => (line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line));
          }
          return [...current, { item, quantity: 1 }];
        });
      },
      increment(id) {
        setLines((current) => current.map((line) => (line.item.id === id ? { ...line, quantity: line.quantity + 1 } : line)));
      },
      decrement(id) {
        setLines((current) =>
          current
            .map((line) => (line.item.id === id ? { ...line, quantity: Math.max(0, line.quantity - 1) } : line))
            .filter((line) => line.quantity > 0)
        );
      },
      remove(id) {
        setLines((current) => current.filter((line) => line.item.id !== id));
      },
      clear() {
        setLines([]);
      }
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
