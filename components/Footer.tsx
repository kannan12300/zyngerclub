import { createWhatsAppLink } from "@/lib/whatsapp";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Offers", href: "#offers" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

export default function Footer() {
  return (
    <footer className="bg-[#1A120B] pb-24 pt-14 text-orange-50 lg:pb-10">
      <div className="section-shell grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-5xl font-extrabold text-white">Zynger Club</p>
          <p className="mt-4 max-w-xl font-semibold leading-7 text-orange-100">
            Fried chicken cafe and fast food restaurant near New Bus Stand Road, Kunnamkulam, Thrissur, Kerala.
          </p>
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-6 inline-flex min-h-12 rounded-full bg-orange-600 px-6 py-3 text-base font-extrabold text-white transition hover:bg-red-600"
          >
            WhatsApp Order
          </a>
        </div>
        <div>
          <p className="mb-4 font-extrabold uppercase tracking-wide text-[#FDBA21]">Quick links</p>
          <div className="grid gap-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="focus-ring rounded-lg py-1 font-bold hover:text-[#FDBA21]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 font-extrabold uppercase tracking-wide text-[#FDBA21]">Contact</p>
          <div className="space-y-2 font-bold text-orange-100">
            <p>Mob: 9207774880</p>
            <p>Tel: 04885 359683</p>
            <p>11 AM - 11 PM daily</p>
            <p>Home Delivery Available</p>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/10 pt-6 text-sm font-bold text-orange-200">
        © 2026 Zynger Club Fried Chicken Cafe. Menu prices can change in-store.
      </div>
    </footer>
  );
}
