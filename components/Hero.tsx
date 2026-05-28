"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionDiv, MotionSection } from "@/components/Motion";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { heroSlides } from "@/data/offers";
import { heroTrustBadges, siteInfo } from "@/data/site";

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <MotionSection
      id="home"
      className="hero-band relative max-h-none overflow-hidden pb-8 pt-24 md:max-h-[520px] md:pb-10 md:pt-28 lg:pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="section-shell grid items-center gap-5 md:grid-cols-[1fr_0.74fr]">
        <div>
          <MotionDiv
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="brand-glass text-accent mb-2 inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide"
          >
            {siteInfo.region}
          </MotionDiv>
          <MotionDiv initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.03, duration: 0.25 }}>
            <h1 className="font-display max-w-3xl break-words text-4xl uppercase leading-[0.94] text-white md:text-5xl lg:text-6xl">
              Kunnamkulam&apos;s <span className="text-accent">Crispy Chicken</span> Spot
            </h1>
            <p className="text-muted-brand mt-3 max-w-2xl text-sm font-semibold leading-6 md:text-base md:leading-7">
              {siteInfo.description}
            </p>
          </MotionDiv>

          <div className="mt-4 grid grid-cols-1 gap-2 min-[390px]:grid-cols-3 md:flex md:flex-wrap">
            <Link
              href="/menu/burger"
              className="focus-ring brand-button min-h-10 rounded-full px-5 py-2.5 text-center text-sm font-extrabold text-white transition"
            >
              View Menu
            </Link>
            <Link
              href="/cart"
              className="focus-ring soft-button min-h-10 rounded-full px-5 py-2.5 text-center text-sm font-extrabold transition"
            >
              Order Online
            </Link>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-ring min-h-10 rounded-full bg-green-600 px-5 py-2.5 text-center text-sm font-extrabold text-white transition hover:bg-green-700"
            >
              WhatsApp Order
            </a>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {heroTrustBadges.map((badge) => (
              <div key={badge} className="brand-surface text-cream rounded-xl px-2 py-2 text-center text-xs font-extrabold md:text-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <MotionDiv
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="offer-frame relative mx-auto w-full max-w-[390px] overflow-hidden rounded-[1.25rem] p-2 shadow-2xl shadow-black/40 lg:max-w-[430px]"
        >
          {slide.price ? (
            <div className="bg-danger absolute right-3 top-3 z-10 rounded-full px-3 py-1.5 font-display text-xl uppercase text-white shadow-lg">
              {slide.price}
            </div>
          ) : null}
          <div className="bg-card-strong relative aspect-[4/3] max-h-[220px] overflow-hidden rounded-[1rem] md:max-h-[280px] xl:max-h-[340px]">
            <Image
              src={slide.image}
              alt={`${slide.title} offer visual`}
              width={1600}
              height={1100}
              priority
              className="h-full w-full object-cover"
            />
            <Link href={slide.href} className="slide-caption absolute inset-x-3 bottom-3 rounded-2xl p-3 backdrop-blur">
              <span className="text-accent block text-xs font-extrabold uppercase tracking-wide">{slide.eyebrow}</span>
              <span className="font-display block text-3xl uppercase leading-none text-white">{slide.title}</span>
              <span className="text-muted-brand mt-1 line-clamp-2 block text-xs font-bold leading-5">{slide.description}</span>
            </Link>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {heroSlides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Show ${item.title}`}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition ${active === index ? "bg-cream" : "bg-track"}`}
              />
            ))}
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
