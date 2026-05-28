import { testimonialReviews } from "@/data/site";

export default function Reviews() {
  return (
    <section className="py-7 md:py-10">
      <div className="section-shell">
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-wide text-red-400">Testimonials</p>
          <h2 className="font-display text-3xl uppercase leading-none text-white md:text-5xl">Guest Picks</h2>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {testimonialReviews.map((review) => (
            <article key={review} className="brand-surface rounded-2xl p-3 md:p-4">
              <p className="text-danger text-[11px] font-extrabold uppercase tracking-wide">Sample testimonial</p>
              <p className="text-cream mt-2 text-sm font-extrabold leading-5 md:text-base md:leading-6">&quot;{review}&quot;</p>
              <div className="text-accent mt-3 flex gap-1 text-sm" aria-label="Five star visual rating">
                <span>*</span>
                <span>*</span>
                <span>*</span>
                <span>*</span>
                <span>*</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
