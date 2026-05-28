"use client";

import Link from "next/link";
import MenuCard from "@/components/MenuCard";
import { useCart } from "@/components/CartProvider";
import { menuItems, menuRouteCategories, type MenuRouteCategory } from "@/data/menu";

export default function CategoryMenuPage({ category }: { category: MenuRouteCategory }) {
  const cart = useCart();
  const items = menuItems.filter((item) => category.categories.includes(item.category));

  return (
    <main className="app-main min-h-screen pb-12 pt-24">
      <section className="section-shell">
        <div className="brand-surface mb-5 rounded-[1.25rem] p-5">
          <p className="text-accent text-xs font-extrabold uppercase tracking-wide">Menu Category</p>
          <div className="mt-2 grid gap-3 md:flex md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-5xl uppercase leading-none text-white md:text-7xl">{category.label}</h1>
              <p className="text-muted-brand mt-2 max-w-2xl text-sm font-semibold leading-6 md:text-base">{category.description}</p>
            </div>
            <Link href="/cart" className="focus-ring brand-button rounded-full px-5 py-3 text-center text-base font-extrabold text-white">
              Cart {cart.count > 0 ? `(${cart.count})` : ""}
            </Link>
          </div>
        </div>

        <div className="snap-gallery mb-5 flex gap-2 overflow-x-auto pb-1">
          {menuRouteCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/menu/${item.slug}`}
              className={`focus-ring shrink-0 rounded-full px-4 py-3 text-sm font-extrabold ${
                item.slug === category.slug ? "chip-active" : "chip-idle"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {items.length > 0 ? (
          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={cart.addItem} />
              ))}
            </div>
          </div>
        ) : (
          <div className="brand-surface rounded-[1.25rem] p-8 text-center">
            <h2 className="font-display text-4xl uppercase text-white">Coming Soon</h2>
            <p className="text-muted-brand mt-2 text-base font-semibold">Add dessert items in the menu data when this category is ready.</p>
          </div>
        )}
      </section>
    </main>
  );
}
