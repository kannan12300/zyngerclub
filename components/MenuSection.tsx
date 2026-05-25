"use client";

import { useMemo, useState } from "react";
import MenuCard from "@/components/MenuCard";
import OrderCart from "@/components/OrderCart";
import SectionHeader from "@/components/SectionHeader";
import { menuCategories, menuItems, type MenuCategory, type MenuItem } from "@/data/menu";
import { categoryIcons } from "@/data/visuals";

export type CartLine = {
  item: MenuItem;
  quantity: number;
};

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);

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

  const total = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);

  function addItem(item: MenuItem) {
    setCart((current) => {
      const existing = current.find((line) => line.item.id === item.id);
      if (existing) {
        return current.map((line) => (line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...current, { item, quantity: 1 }];
    });
  }

  function increment(id: string) {
    setCart((current) => current.map((line) => (line.item.id === id ? { ...line, quantity: line.quantity + 1 } : line)));
  }

  function decrement(id: string) {
    setCart((current) =>
      current
        .map((line) => (line.item.id === id ? { ...line, quantity: Math.max(0, line.quantity - 1) } : line))
        .filter((line) => line.quantity > 0)
    );
  }

  function remove(id: string) {
    setCart((current) => current.filter((line) => line.item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

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
            <div className="sticky top-[72px] z-20 mb-6 max-w-full overflow-hidden rounded-[1.25rem] border border-orange-100 bg-white p-3 shadow-lg shadow-orange-900/8 md:p-4">
              <label htmlFor="menu-search" className="sr-only">
                Search menu
              </label>
              <input
                id="menu-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search burgers, meals, mojitos..."
                className="focus-ring mb-4 min-h-12 w-full rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-base font-bold text-[#1F2937] outline-none placeholder:text-gray-500"
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
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                        : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                    }`}
                  >
                    <span aria-hidden="true">{categoryIcons[category]}</span> {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 grid gap-3 min-[390px]:flex min-[390px]:items-center min-[390px]:justify-between">
              <p className="text-base font-extrabold text-gray-700">{filteredItems.length} items shown</p>
              <p className="rounded-full bg-orange-100 px-4 py-2 text-sm font-extrabold text-orange-800">
                Home delivery available
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={addItem} />
              ))}
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-[1.5rem] border border-orange-100 bg-white p-8 text-center card-shadow">
                <p className="font-display text-5xl uppercase">No Crispy Match</p>
                <p className="mt-2 font-semibold text-gray-600">Try another search or category chip.</p>
              </div>
            ) : null}
          </div>

          <OrderCart
            lines={cart}
            total={total}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={remove}
            onClear={clearCart}
          />
        </div>
      </div>
    </section>
  );
}
