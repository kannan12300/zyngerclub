"use client";

import Link from "next/link";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function MobileBottomBar() {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-[1.4rem] border-t border-orange-500/25 bg-[#0b0b0d] px-3 pb-3 pt-2 shadow-2xl shadow-black/40 lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <Link
          href="/menu/burger"
          className="focus-ring min-h-11 rounded-2xl bg-[#151515] px-3 py-3 text-center text-sm font-extrabold text-orange-300"
        >
          Menu
        </Link>
        <Link
          href="/cart"
          className="focus-ring min-h-11 rounded-2xl bg-[#151515] px-3 py-3 text-center text-sm font-extrabold text-red-300"
        >
          Cart
        </Link>
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noreferrer"
          className="focus-ring min-h-11 rounded-2xl bg-green-600 px-3 py-3 text-center text-sm font-extrabold text-white"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
