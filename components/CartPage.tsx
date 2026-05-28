"use client";

import Link from "next/link";
import OrderCart from "@/components/OrderCart";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const cart = useCart();

  return (
    <main className="app-main min-h-screen pb-12 pt-24">
      <section className="section-shell">
        <div className="brand-surface mb-6 grid gap-3 rounded-[1.25rem] p-5 md:flex md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-orange-300">Checkout</p>
            <h1 className="font-display text-5xl uppercase leading-none text-white md:text-7xl">Your Cart</h1>
            <p className="text-muted-brand mt-2 max-w-2xl text-sm font-semibold leading-6">
              Review your items, checkout online, or send the order directly on WhatsApp.
            </p>
          </div>
          <Link href="/menu/burger" className="focus-ring brand-surface text-muted-brand rounded-full px-5 py-3 text-center text-base font-extrabold">
            Add more
          </Link>
        </div>

        <div className="brand-surface mx-auto max-w-3xl rounded-[1.5rem] p-4">
          <OrderCart
            lines={cart.lines}
            total={cart.total}
            onIncrement={cart.increment}
            onDecrement={cart.decrement}
            onRemove={cart.remove}
            onClear={cart.clear}
            displayMode="embedded"
          />
        </div>
      </section>
    </main>
  );
}
