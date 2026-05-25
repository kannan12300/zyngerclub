import SectionHeader from "@/components/SectionHeader";

const reviews = [
  "Crispy chicken and good combos.",
  "Best place for burgers and fried chicken in Kunnamkulam.",
  "Loaded fries and mojitos are worth trying."
];

export default function Reviews() {
  return (
    <section className="py-14 md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Sample Testimonials"
          title="What Guests Often Look For"
          description="Placeholder review cards for layout preview. Replace with real customer reviews when available."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review} className="rounded-[1.25rem] border border-orange-100 bg-white p-5 shadow-lg shadow-orange-900/10">
              <p className="text-sm font-extrabold uppercase tracking-wide text-red-600">Sample testimonial</p>
              <p className="mt-5 text-xl font-extrabold leading-8 text-[#1F2937]">&quot;{review}&quot;</p>
              <div className="mt-6 flex gap-1 text-orange-500" aria-label="Five star visual rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
