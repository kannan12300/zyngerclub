import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { getMenuImage } from "@/data/visuals";

type MenuCardProps = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
};

const badgeStyles: Record<string, string> = {
  Popular: "bg-orange-100 text-orange-800",
  New: "bg-green-100 text-green-800",
  Combo: "bg-yellow-100 text-yellow-900",
  Family: "bg-red-100 text-red-700",
  Offer: "bg-red-600 text-white",
  Spicy: "bg-[#1F2937] text-white"
};

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-md shadow-orange-900/10 transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 md:rounded-[1.25rem]">
      <div className="relative aspect-[1.15/1] overflow-hidden bg-orange-50 md:aspect-[4/3]">
        <Image
          src={getMenuImage(item)}
          alt={`${item.name} branded Zynger Club food visual`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 max-w-[72%] truncate rounded-full bg-red-600 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-lg md:left-3 md:top-3 md:px-3 md:text-xs">
          {item.category}
        </span>
        {item.badge ? (
          <span
            className={`absolute right-2 top-2 max-w-[55%] truncate rounded-full px-2 py-1 text-[10px] font-extrabold md:right-3 md:top-3 md:px-3 md:text-xs ${badgeStyles[item.badge]}`}
          >
            {item.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-5">
        <h3 className="line-clamp-2 min-h-10 break-words font-display text-xl uppercase leading-none text-[#1F2937] md:min-h-0 md:text-3xl">
          {item.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs font-semibold leading-5 text-gray-700 md:mt-3 md:text-sm md:leading-6">
          {item.description ?? "Freshly served Zynger Club favorite."}
        </p>
        <div className="mt-3 grid gap-2 md:mt-5 md:flex md:items-center md:justify-between md:gap-3">
          <p className="font-display text-3xl leading-none text-orange-600 md:text-4xl">₹{item.price}</p>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="focus-ring min-h-10 rounded-full bg-[#1F2937] px-3 py-2 text-xs font-extrabold text-white transition hover:bg-orange-600 md:min-h-11 md:px-5 md:py-3 md:text-sm"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
