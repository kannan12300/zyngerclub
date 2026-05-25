import Image from "next/image";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function PartyOrder() {
  return (
    <section className="bg-[#1A120B] py-14 text-white md:py-20">
      <div className="section-shell grid items-center gap-6 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-orange-600 px-4 py-2 text-sm font-extrabold uppercase tracking-wide">
            Bulk Orders
          </p>
          <h2 className="font-display text-5xl uppercase leading-none text-white md:text-7xl">
            Planning a Party or <span className="text-[#FDBA21]">Family Treat?</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-orange-100 md:text-lg md:leading-8">
            From birthday cravings to family gatherings, Zynger Club&apos;s bucket meals, loaded fries, burgers and shakes
            are built for sharing.
          </p>
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-7 inline-flex min-h-12 rounded-full bg-orange-600 px-7 py-4 text-base font-extrabold text-white transition hover:bg-red-600"
          >
            Book Bulk Order on WhatsApp
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/10 bg-orange-950">
          <Image
            src="/menu/bucket-meal.png"
            alt="AI-style Zynger Club bucket meal for party orders"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
