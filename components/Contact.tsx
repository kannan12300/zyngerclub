import SectionHeader from "@/components/SectionHeader";
import { createWhatsAppLink } from "@/lib/whatsapp";

const details = [
  { label: "Location", value: "Adam Bazaar Building, New Bus Stand Road, Kunnamkulam" },
  { label: "Phone", value: "9207774880" },
  { label: "Tel", value: "04885 359683" },
  { label: "Time", value: "11 AM - 11 PM" },
  { label: "Delivery", value: "Home Delivery Available" },
  { label: "Zomato", value: "Available on Zomato" }
];

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Order Hot From Kunnamkulam"
          description="Call, WhatsApp, visit, or find Zynger Club on Zomato."
        />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.25rem] bg-gradient-to-br from-[#1A120B] via-[#2b190e] to-[#EA580C] p-5 text-white shadow-lg shadow-orange-900/15 md:p-7">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#FDBA21]">Zynger Club</p>
            <h3 className="mt-2 font-display text-5xl uppercase leading-none md:text-6xl">Fried Chicken Cafe</h3>
            <p className="mt-5 font-semibold leading-7 text-orange-50">
              Fast food, family meals, party orders and home delivery near New Bus Stand Road.
            </p>
            <div className="mt-7 grid gap-3">
              <ActionButton href="tel:9207774880" label="Call Now" />
              <ActionButton href={createWhatsAppLink()} label="WhatsApp Order" external />
              <ActionButton
                href="https://www.google.com/maps/search/?api=1&query=Zynger%20Club%20Adam%20Bazaar%20Building%20New%20Bus%20Stand%20Road%20Kunnamkulam"
                label="Open Google Maps"
                external
              />
              <ActionButton href="https://www.zomato.com/kunnamkulam" label="Order on Zomato" external />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-[1.25rem] border border-orange-100 bg-[#FFF7ED] p-5 shadow-lg shadow-orange-900/10 md:p-6">
                <p className="text-sm font-extrabold uppercase tracking-wide text-red-600">{detail.label}</p>
                <p className="mt-3 text-lg font-extrabold leading-7 text-[#1F2937]">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionButton({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="focus-ring min-h-12 rounded-full bg-white px-5 py-3 text-center text-base font-extrabold text-[#1F2937] transition hover:bg-[#FDBA21]"
    >
      {label}
    </a>
  );
}
