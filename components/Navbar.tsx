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
      className={`fixed inset-x-0 top-0 z-50 border-b border-orange-500/20 transition-colors ${
        scrolled ? "bg-[#0f0a05] shadow-lg shadow-black/30" : "bg-[#0f0a05]/96"
      }`}
    >
      <nav className="section-shell flex h-18 min-h-18 items-center justify-between gap-2 py-3" aria-label="Primary navigation">
        <a href="#home" className="focus-ring flex shrink-0 items-center gap-2 rounded-full lg:gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-600 font-display text-2xl text-white shadow-lg shadow-orange-700/20">
            Z
          </span>
          <span className="min-w-0">
            <span className="font-display block truncate text-2xl uppercase leading-none text-white lg:text-3xl">Zynger Club</span>
            <span className="hidden truncate text-xs font-extrabold uppercase tracking-[0.12em] text-orange-400 lg:block">
              Fried Chicken Cafe
            </span>
          </span>
        </a>

        <div className="hidden min-w-0 items-center gap-0 md:flex lg:gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring min-h-11 rounded-full px-2 py-3 text-sm font-extrabold text-[#f3d6b3] transition hover:bg-orange-500/15 hover:text-white lg:px-4 lg:text-base"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#menu"
          className="focus-ring hidden min-h-11 rounded-full bg-orange-600 px-5 py-3 text-base font-extrabold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 lg:inline-flex"
        >
          Order Now
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex size-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-[#20140c] text-3xl font-black leading-none text-orange-400 md:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-orange-500/20 bg-[#0f0a05] px-4 py-5 shadow-xl md:hidden">
          <div className="mx-auto grid max-w-xl gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring min-h-12 rounded-2xl bg-[#20140c] px-5 py-4 text-lg font-extrabold text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="focus-ring min-h-12 rounded-2xl bg-[#fff7ed] px-4 py-4 text-center font-extrabold text-[#1f2937] ring-2 ring-orange-500"
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
