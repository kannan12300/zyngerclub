import { offers } from "@/data/offers";
import SectionHeader from "@/components/SectionHeader";

export default function Offers() {
  return (
    <section id="offers" className="bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#DC2626] py-14 text-white md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Offer Highlights"
          title="Crispy Deals That Move Fast"
          description="Weekly offers, family packs and combo plates for burger runs, group cravings and party orders."
          light
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="relative overflow-hidden rounded-[1.25rem] border border-white/25 bg-white p-5 text-[#1F2937] shadow-xl shadow-red-900/15 transition hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-extrabold text-white">{offer.label}</span>
                {offer.price ? (
                  <span className="rounded-full bg-[#1F2937] px-4 py-2 font-display text-3xl text-[#FDBA21]">
                    {offer.price}
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-4xl uppercase leading-none">{offer.title}</h3>
              <p className="mt-4 text-base font-semibold leading-7 text-gray-700">{offer.description}</p>
              <a
                href="#menu"
                className="focus-ring mt-6 inline-flex min-h-12 rounded-full bg-orange-600 px-5 py-3 text-base font-extrabold text-white transition hover:bg-red-600"
              >
                Add from menu
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
