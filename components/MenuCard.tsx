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
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-orange-100 bg-white shadow-lg shadow-orange-900/10 transition duration-200 hover:-translate-y-1 hover:border-orange-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
        <Image
          src={getMenuImage(item)}
          alt={`${item.name} branded Zynger Club food visual`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg">
          {item.category}
        </span>
        {item.badge ? (
          <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold ${badgeStyles[item.badge]}`}>
            {item.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-3xl uppercase leading-none text-[#1F2937]">{item.name}</h3>
        {item.description ? (
          <p className="mt-3 flex-1 text-sm font-semibold leading-6 text-gray-700">{item.description}</p>
        ) : (
          <p className="mt-3 flex-1 text-sm font-semibold leading-6 text-gray-700">Freshly served Zynger Club favorite.</p>
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-4xl text-orange-600">₹{item.price}</p>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="focus-ring min-h-11 rounded-full bg-[#1F2937] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-600"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
