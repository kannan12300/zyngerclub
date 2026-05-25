import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const gallery = [
  { src: "/gallery/gallery-1.png", alt: "AI-style Zynger Club burger visual", label: "Burger Stack" },
  { src: "/gallery/gallery-2.png", alt: "AI-style Zynger Club bucket visual", label: "Bucket Meals" },
  { src: "/gallery/gallery-3.png", alt: "AI-style Zynger Club loaded fries visual", label: "Loaded Fries" },
  { src: "/gallery/gallery-4.png", alt: "AI-style Zynger Club drinks visual", label: "Mojitos & Shakes" }
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#FFF7ED] py-14 md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Gallery"
          title="Demo Food Visuals"
          description="Reels-style branded AI visuals for demo use, ready to replace with real shop content later."
        />
        <div className="snap-gallery -mx-3 flex gap-4 overflow-x-auto px-3 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {gallery.map((image) => (
            <article
              key={image.src}
              className="group min-w-[82%] snap-center overflow-hidden rounded-[1.25rem] border border-orange-100 bg-white shadow-lg shadow-orange-900/10 sm:min-w-[44%] lg:min-w-0"
            >
              <div className="relative aspect-[9/12] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 82vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-4 shadow-lg">
                  <p className="font-display text-3xl uppercase leading-none text-[#1F2937]">{image.label}</p>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-red-600">Demo visual</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
