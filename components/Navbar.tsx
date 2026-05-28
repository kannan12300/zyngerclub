"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { menuRouteCategories } from "@/data/menu";
import { siteInfo } from "@/data/site";
import { createWhatsAppLink } from "@/lib/whatsapp";

const navLinks = [{ label: "Home", href: "/" }, ...menuRouteCategories.map((category) => ({ label: category.label, href: `/menu/${category.slug}` }))];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRootRef = useRef<HTMLElement>(null);
  const cart = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!navRootRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={navRootRef}
      className={`brand-border fixed inset-x-0 top-0 z-50 overflow-visible border-b transition-colors backdrop-blur-xl ${
        scrolled ? "brand-header-scrolled shadow-lg shadow-black/40" : "brand-header-idle"
      }`}
    >
      <nav className="section-shell relative flex h-18 min-h-18 items-center justify-between gap-2 overflow-visible py-3" aria-label="Primary navigation">
        <Link href="/" className="focus-ring flex min-w-0 shrink-0 items-center gap-2 rounded-full lg:gap-3" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-button grid size-11 shrink-0 place-items-center rounded-2xl font-display text-2xl text-white">
            {siteInfo.shortName}
          </span>
          <span className="min-w-0">
            <span className="font-display block truncate text-2xl uppercase leading-none text-white lg:text-3xl">{siteInfo.name}</span>
            <span className="text-accent hidden truncate text-xs font-extrabold uppercase tracking-wide lg:block">{siteInfo.tagline}</span>
          </span>
        </Link>

        <div className="hidden min-w-0 items-center gap-0 md:flex lg:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring text-muted-brand nav-hover min-h-11 rounded-full px-2 py-3 text-sm font-extrabold transition hover:text-white lg:px-4 lg:text-base"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          className="focus-ring brand-button hidden min-h-11 rounded-full px-5 py-3 text-base font-extrabold text-white transition lg:inline-flex"
        >
          Cart {cart.count > 0 ? `(${cart.count})` : ""}
        </Link>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/cart"
            aria-label="Open cart"
            className="focus-ring brand-surface text-accent relative grid size-11 place-items-center rounded-2xl text-lg md:hidden"
          >
            <span aria-hidden="true">🛒</span>
            {cart.count > 0 ? (
              <span className="bg-danger absolute -right-1 -top-1 grid size-5 place-items-center rounded-full text-[11px] font-black text-white">
                {cart.count}
              </span>
            ) : null}
          </Link>
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="focus-ring whatsapp-button grid size-11 place-items-center rounded-2xl text-lg text-white md:hidden"
          >
            <span aria-hidden="true">☎</span>
          </a>
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus-ring brand-surface text-accent pointer-events-auto inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-2xl text-2xl font-black leading-none md:hidden"
          >
            {mobileMenuOpen ? "x" : "☰"}
          </button>
        </div>
      </nav>

      {mobileMenuOpen ? (
        <div
          id="mobile-nav-panel"
          data-testid="mobile-nav-panel"
          className="brand-glass pointer-events-auto absolute right-4 top-full z-[9999] mt-3 w-[min(20rem,calc(100vw-2rem))] origin-top-right rounded-2xl p-4 opacity-100 transition duration-150 ease-out [transform:translateY(0)_scale(1)] md:hidden"
        >
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring mobile-panel-link pointer-events-auto min-h-[44px] touch-manipulation rounded-xl px-4 py-3 text-base font-extrabold"
              >
                {link.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring brand-button pointer-events-auto min-h-[44px] touch-manipulation rounded-xl px-3 py-3 text-center text-sm font-extrabold text-white"
              >
                Cart
              </Link>
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="focus-ring pointer-events-auto min-h-[44px] touch-manipulation rounded-xl bg-green-600 px-3 py-3 text-center text-sm font-extrabold text-white"
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
