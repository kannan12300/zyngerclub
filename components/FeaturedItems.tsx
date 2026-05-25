import Image from "next/image";
import { menuItems, type MenuItem, zyngerPlatter } from "@/data/menu";
import { getMenuImage } from "@/data/visuals";
import SectionHeader from "@/components/SectionHeader";

const featuredIds = ["zinger-burger", "signature-chicken-loaded-fries", "family-meal", "blue-coraco", "hazel-nut"];

const featured = [
  ...featuredIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item)),
  zyngerPlatter
];

export default function FeaturedItems() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Popular Items"
          title="Franchise-Level Favorites"
          description="Large-format cards for the items customers naturally scan first."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {featured.map((item) => (
            <article
              key={item.id}
              className="group min-w-0 overflow-hidden rounded-2xl border border-orange-100 bg-[#FFF7ED] shadow-md shadow-orange-900/10 transition hover:-translate-y-0.5 md:rounded-[1.25rem]"
            >
              <div className="relative aspect-[1.15/1] overflow-hidden bg-orange-100 md:aspect-[16/10]">
                <Image
                  src={getMenuImage(item)}
                  alt={`${item.name} AI-style food visual`}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 md:p-5">
                <span className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white md:px-3 md:text-xs">
                  {item.badge ?? item.category}
                </span>
                <h3 className="mt-3 line-clamp-2 font-display text-xl uppercase leading-none text-[#1F2937] md:mt-4 md:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-2 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-gray-700 md:mt-3 md:min-h-12 md:text-sm md:leading-6">
                  {item.description ?? item.category}
                </p>
                <div className="mt-3 grid gap-2 md:mt-5 md:flex md:items-center md:justify-between md:gap-4">
                  <p className="font-display text-3xl leading-none text-orange-600 md:text-5xl">₹{item.price}</p>
                  <a
                    href="#menu"
                    className="focus-ring min-h-10 rounded-full bg-[#1F2937] px-3 py-2 text-center text-xs font-extrabold text-white transition hover:bg-orange-600 md:min-h-12 md:px-5 md:py-3 md:text-base"
                  >
                    Order
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
