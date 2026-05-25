"use client";

import { useEffect, useState } from "react";
import { createWhatsAppLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Offers", href: "#offers" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-orange-100 transition-colors ${
        scrolled ? "bg-white shadow-lg shadow-orange-900/10" : "bg-white/95"
      }`}
    >
      <nav className="section-shell flex h-18 min-h-18 items-center justify-between gap-3 py-3" aria-label="Primary navigation">
        <a href="#home" className="focus-ring flex min-w-0 items-center gap-3 rounded-full" onClick={() => setOpen(false)}>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-600 font-display text-2xl text-white shadow-lg shadow-orange-700/20">
            Z
          </span>
          <span className="min-w-0">
            <span className="font-display block truncate text-3xl uppercase leading-none text-[#1F2937]">Zynger Club</span>
            <span className="block truncate text-xs font-extrabold uppercase tracking-[0.12em] text-orange-600">
              Fried Chicken Cafe
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring min-h-11 rounded-full px-4 py-3 text-base font-extrabold text-gray-800 transition hover:bg-orange-100 hover:text-orange-700"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#menu"
          className="focus-ring hidden min-h-11 rounded-full bg-orange-600 px-5 py-3 text-base font-extrabold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 md:inline-flex"
        >
          Order Now
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex size-12 items-center justify-center rounded-2xl border border-orange-200 bg-white text-3xl font-black leading-none text-orange-600 md:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-orange-100 bg-white px-4 py-5 shadow-xl md:hidden">
          <div className="mx-auto grid max-w-xl gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring min-h-12 rounded-2xl bg-orange-50 px-5 py-4 text-lg font-extrabold text-gray-900"
              >
                {link.label}
              </a>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="focus-ring min-h-12 rounded-2xl bg-white px-4 py-4 text-center font-extrabold text-orange-700 ring-2 ring-orange-500"
              >
                View Menu
              </a>
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="focus-ring min-h-12 rounded-2xl bg-orange-600 px-4 py-4 text-center font-extrabold text-white"
              >
                Order Online
              </a>
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="focus-ring min-h-12 rounded-2xl bg-green-600 px-4 py-4 text-center font-extrabold text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
