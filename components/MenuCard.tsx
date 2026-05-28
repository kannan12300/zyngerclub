import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { getMenuImage } from "@/data/visuals";

type MenuCardProps = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
};

const badgeStyles: Record<string, string> = {
  Popular: "badge-neutral",
  New: "badge-fresh",
  Combo: "badge-gold",
  Family: "bg-danger text-white",
  Offer: "bg-danger text-white",
  Spicy: "bg-zinc-950 text-white"
};

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <article className="brand-surface group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl transition duration-200 hover:-translate-y-0.5 md:rounded-[1.25rem]">
      <div className="bg-card-strong relative aspect-[1.15/1] overflow-hidden md:aspect-[4/3]">
        <Image
          src={getMenuImage(item)}
          alt={`${item.name} menu visual`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="bg-danger absolute left-1.5 top-1.5 max-w-[72%] truncate rounded-full px-1.5 py-1 text-[9px] font-extrabold uppercase text-white shadow-lg md:left-3 md:top-3 md:px-3 md:text-xs">
          {item.category}
        </span>
        {item.badge ? (
          <span
            className={`absolute right-1.5 top-1.5 max-w-[55%] truncate rounded-full px-1.5 py-1 text-[9px] font-extrabold md:right-3 md:top-3 md:px-3 md:text-xs ${badgeStyles[item.badge]}`}
          >
            {item.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-2 md:p-5">
        <h3 className="text-cream line-clamp-2 min-h-9 break-words font-display text-base uppercase leading-none md:min-h-0 md:text-3xl">
          {item.name}
        </h3>
        <p className="text-muted-brand mt-1 line-clamp-2 flex-1 text-[10px] font-semibold leading-4 md:mt-3 md:text-sm md:leading-6">
          {item.description ?? `${item.category} favorite.`}
        </p>
        <div className="mt-2 grid gap-1 md:mt-5 md:flex md:items-center md:justify-between md:gap-3">
          <p className="text-accent font-display text-2xl leading-none md:text-4xl">Rs {item.price}</p>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="focus-ring min-h-9 rounded-full bg-zinc-950 px-2 py-2 text-[11px] font-extrabold text-white transition hover:bg-orange-600 md:min-h-11 md:px-5 md:py-3 md:text-sm"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
