import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

export default function About() {
  return (
    <section id="about" className="py-14 md:py-20">
      <div className="section-shell grid items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative rounded-[1.25rem] bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg shadow-orange-900/15">
          <div className="rounded-[1rem] bg-[#1a120b] p-3">
            <Image
              src="/menu/family-meal.png"
              alt="AI-style Zynger Club family meal visual"
              width={720}
              height={540}
              className="h-auto w-full rounded-[0.9rem]"
            />
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="About Zynger Club" title="Fast, Crispy, Family-Friendly" />
          <p className="text-base font-semibold leading-7 text-[#fed7aa] md:text-lg md:leading-8">
            Zynger Club is a fried chicken cafe in Kunnamkulam serving crispy chicken, burgers, wraps, loaded fries,
            pizzas, shakes, mojitos and family meals. Located near New Bus Stand Road, Zynger Club is built for quick
            bites, family cravings, party orders and home delivery.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {["Quick bites", "Party orders", "Home delivery"].map((value) => (
              <div key={value} className="rounded-2xl border border-orange-500/25 bg-[#1a120b] p-5 text-center shadow-lg shadow-black/30">
                <p className="font-display text-3xl uppercase text-orange-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
