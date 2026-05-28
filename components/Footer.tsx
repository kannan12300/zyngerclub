import Link from "next/link";
import { menuRouteCategories } from "@/data/menu";
import { siteInfo } from "@/data/site";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="footer-band pb-24 pt-14 text-orange-50 lg:pb-10">
      <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <p className="text-accent mb-4 font-extrabold uppercase tracking-wide">Location</p>
          <p className="font-display text-5xl font-extrabold text-white">{siteInfo.name}</p>
          <p className="text-muted-brand mt-4 max-w-xl font-semibold leading-7">{siteInfo.location}</p>
          <a
            href={siteInfo.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring brand-surface text-muted-brand mt-6 inline-flex min-h-12 rounded-full px-6 py-3 text-base font-extrabold transition hover:text-white"
          >
            Open Maps
          </a>
        </div>

        <div>
          <p className="text-accent mb-4 font-extrabold uppercase tracking-wide">Menu</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {menuRouteCategories.map((link) => (
              <Link key={link.slug} href={`/menu/${link.slug}`} className="focus-ring rounded-lg py-1 font-bold hover:text-[var(--gold)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:text-right">
          <p className="text-accent mb-4 font-extrabold uppercase tracking-wide">Contact</p>
          <div className="text-muted-brand space-y-2 font-bold">
            <p>Mob: {siteInfo.phone}</p>
            <p>Tel: {siteInfo.tel}</p>
            <p>{siteInfo.hours}</p>
            <p>{siteInfo.deliveryNote}</p>
          </div>
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-6 inline-flex min-h-12 rounded-full bg-green-600 px-6 py-3 text-base font-extrabold text-white transition hover:bg-green-700"
          >
            WhatsApp Order
          </a>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/10 pt-6 text-sm font-bold text-orange-200">
        {siteInfo.copyright}
      </div>
    </footer>
  );
}
