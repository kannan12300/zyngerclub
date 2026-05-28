"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import MenuCard from "@/components/MenuCard";
import OrderCart from "@/components/OrderCart";
import SectionHeader from "@/components/SectionHeader";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import { categoryIcons } from "@/data/visuals";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">("All");
  const [query, setQuery] = useState("");
  const cart = useCart();

  const filteredItems = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const searchMatch =
        cleanQuery.length === 0 ||
        item.name.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery) ||
        item.description?.toLowerCase().includes(cleanQuery);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  return (
    <section id="menu" className="w-full overflow-hidden py-14 md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Full Menu"
          title="Fast Picks, Hot Deals"
          description="Search, filter and build a WhatsApp order from the real Zynger Club menu."
        />

        <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 overflow-hidden">
            <div className="menu-panel sticky top-[72px] z-20 mb-6 max-w-full overflow-hidden rounded-[1.25rem] p-3 md:p-4">
              <label htmlFor="menu-search" className="sr-only">
                Search menu
              </label>
              <input
                id="menu-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search burgers, meals, mojitos..."
                className="focus-ring menu-input mb-4 min-h-12 w-full rounded-2xl px-5 py-4 text-base font-bold outline-none"
              />
              <div className="snap-gallery flex max-w-full gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
                {(["All", ...menuCategories] as const).map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    className={`focus-ring min-h-11 shrink-0 rounded-full px-4 py-3 text-sm font-extrabold transition md:text-base ${
                      activeCategory === category
                        ? "chip-active"
                        : "chip-idle"
                    }`}
                  >
                    <span aria-hidden="true">{categoryIcons[category]}</span> {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 grid gap-3 min-[390px]:flex min-[390px]:items-center min-[390px]:justify-between">
              <p className="text-muted-brand text-base font-extrabold">{filteredItems.length} items shown</p>
              <Link href="/cart" className="focus-ring brand-surface text-muted-brand rounded-full px-4 py-2 text-center text-sm font-extrabold">
                Cart: {cart.count} items
              </Link>
            </div>

            <div className="max-h-[78vh] min-w-0 overflow-y-auto pr-1">
              <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={cart.addItem} />
              ))}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="brand-surface rounded-[1.5rem] p-8 text-center">
                <p className="font-display text-5xl uppercase">No Crispy Match</p>
                <p className="text-muted-brand mt-2 font-semibold">Try another search or category chip.</p>
              </div>
            ) : null}
          </div>

          <OrderCart
            lines={cart.lines}
            total={cart.total}
            onIncrement={cart.increment}
            onDecrement={cart.decrement}
            onRemove={cart.remove}
            onClear={cart.clear}
          />
        </div>
      </div>
    </section>
  );
}
