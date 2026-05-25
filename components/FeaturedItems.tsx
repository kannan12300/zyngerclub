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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[1.25rem] border border-orange-100 bg-[#FFF7ED] shadow-lg shadow-orange-900/10 transition hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-orange-100">
                <Image
                  src={getMenuImage(item)}
                  alt={`${item.name} AI-style food visual`}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
                  {item.badge ?? item.category}
                </span>
                <h3 className="mt-4 font-display text-4xl uppercase leading-none text-[#1F2937]">{item.name}</h3>
                <p className="mt-3 min-h-12 text-sm font-semibold leading-6 text-gray-700">{item.description ?? item.category}</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="font-display text-5xl text-orange-600">₹{item.price}</p>
                  <a
                    href="#menu"
                    className="focus-ring min-h-12 rounded-full bg-[#1F2937] px-5 py-3 text-base font-extrabold text-white transition hover:bg-orange-600"
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
