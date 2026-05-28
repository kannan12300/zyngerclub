"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { menuItems, zyngerPlatter, type MenuItem } from "@/data/menu";
import { bestsellerItemIds } from "@/data/site";
import { getMenuImage } from "@/data/visuals";

const bestsellers = [
  ...bestsellerItemIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item)),
  zyngerPlatter
];

export default function BestsellerSlider() {
  const cart = useCart();

  return (
    <section className="section-band py-12 md:py-16">
      <div className="section-shell">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-accent text-xs font-extrabold uppercase tracking-wide">Bestsellers</p>
            <h2 className="font-display text-4xl uppercase leading-none text-white md:text-6xl">Most Ordered</h2>
          </div>
          <Link href="/menu/burger" className="focus-ring brand-surface text-muted-brand shrink-0 rounded-full px-4 py-3 text-sm font-extrabold">
            View all
          </Link>
        </div>

        <div className="snap-gallery flex gap-3 overflow-x-auto pb-2">
          {bestsellers.map((item) => (
            <article
              key={item.id}
              className="brand-surface w-[72vw] max-w-[19rem] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[20rem]"
            >
              <div className="bg-card-strong relative aspect-[4/3] overflow-hidden">
                <Image src={getMenuImage(item)} alt={`${item.name} bestseller`} fill sizes="320px" className="object-cover" />
                <span className="bg-danger absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold uppercase text-white">
                  {item.badge ?? item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 min-h-12 font-display text-3xl uppercase leading-none text-white">{item.name}</h3>
                <p className="text-muted-brand mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5">
                  {item.description ?? `${item.category} bestseller.`}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-accent font-display text-4xl leading-none">Rs {item.price}</span>
                  <button
                    type="button"
                    onClick={() => cart.addItem(item)}
                    className="focus-ring brand-button min-h-11 rounded-full px-4 py-3 text-sm font-extrabold text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
