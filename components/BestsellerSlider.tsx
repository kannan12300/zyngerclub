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
    <section className="section-band py-8 md:py-10">
      <div className="section-shell">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-accent text-xs font-extrabold uppercase tracking-wide">Bestsellers</p>
            <h2 className="font-display text-3xl uppercase leading-none text-white md:text-5xl">Most Ordered</h2>
          </div>
          <Link href="/menu/burger" className="focus-ring brand-surface text-muted-brand shrink-0 rounded-full px-3 py-2 text-xs font-extrabold">
            View all
          </Link>
        </div>

        <div className="snap-gallery flex gap-2 overflow-x-auto pb-2">
          {bestsellers.map((item) => (
            <article
              key={item.id}
              className="brand-surface w-[42vw] max-w-[10rem] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[11rem] md:max-w-[12rem]"
            >
              <div className="bg-card-strong relative aspect-[1.05/1] overflow-hidden">
                <Image src={getMenuImage(item)} alt={`${item.name} bestseller`} fill sizes="320px" className="object-cover" />
                <span className="bg-danger absolute left-2 top-2 max-w-[75%] truncate rounded-full px-2 py-1 text-[9px] font-extrabold uppercase text-white">
                  {item.badge ?? item.category}
                </span>
              </div>
              <div className="p-2.5">
                <h3 className="line-clamp-2 min-h-8 font-display text-base uppercase leading-none text-white md:text-xl">{item.name}</h3>
                <p className="text-muted-brand mt-1 line-clamp-2 min-h-8 text-[10px] font-semibold leading-4">
                  {item.description ?? `${item.category} bestseller.`}
                </p>
                <div className="mt-2 grid gap-1">
                  <span className="text-accent font-display text-2xl leading-none">Rs {item.price}</span>
                  <button
                    type="button"
                    onClick={() => cart.addItem(item)}
                    className="focus-ring brand-button min-h-9 rounded-full px-3 py-2 text-[11px] font-extrabold text-white"
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
