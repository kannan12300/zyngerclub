"use client";

import Image from "next/image";
import { MotionDiv, MotionSection } from "@/components/Motion";
import { createWhatsAppLink } from "@/lib/whatsapp";

const trustBadges = ["Home Delivery", "Family Meals", "Freshly Served"];

export default function Hero() {
  return (
    <MotionSection
      id="home"
      className="relative max-h-none overflow-hidden bg-[linear-gradient(135deg,#0f0a05_0%,#1c120a_58%,#2a1608_100%)] py-10 md:max-h-[520px] md:py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-shell grid items-center gap-6 md:grid-cols-[1fr_0.78fr]">
        <div>
          <MotionDiv
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-3 inline-flex rounded-full border border-orange-500/30 bg-[#20140c] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-orange-300 shadow-sm"
          >
            Kunnamkulam / Thrissur
          </MotionDiv>
          <MotionDiv initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.04, duration: 0.3 }}>
            <h1 className="font-display max-w-3xl break-words text-4xl uppercase leading-[0.94] text-white md:text-5xl lg:text-[3.6rem]">
              Kunnamkulam&apos;s <span className="text-orange-500">Crispy Chicken</span> Spot
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#f3d6b3] md:text-base md:leading-7">
              Burgers, fried chicken, loaded fries, wraps, shakes, mojitos and family meals - served hot from Zynger Club.
            </p>
          </MotionDiv>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3 md:flex md:flex-wrap">
            <a
              href="#menu"
              className="focus-ring min-h-10 rounded-full bg-orange-600 px-5 py-2.5 text-center text-sm font-extrabold text-white shadow-lg shadow-orange-600/15 transition hover:bg-orange-700"
            >
              View Menu
            </a>
            <a
              href="#menu"
              className="focus-ring min-h-10 rounded-full border-2 border-orange-600 bg-[#fff7ed] px-5 py-2.5 text-center text-sm font-extrabold text-[#1f2937] transition hover:bg-orange-50"
            >
              Order Online
            </a>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-ring min-h-10 rounded-full bg-green-600 px-5 py-2.5 text-center text-sm font-extrabold text-white transition hover:bg-green-700"
            >
              WhatsApp Order
            </a>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {trustBadges.map((badge) => (
              <div key={badge} className="rounded-xl border border-orange-500/20 bg-[#20140c] px-2 py-2 text-center text-xs font-extrabold text-[#fff7ed] shadow-sm md:text-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <MotionDiv
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.06, duration: 0.3 }}
          className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[1.25rem] bg-orange-600 p-2 shadow-lg shadow-black/30"
        >
          <div className="absolute right-3 top-3 z-10 rounded-full bg-red-600 px-3 py-1.5 font-display text-xl uppercase text-white shadow-lg">
            10 Pc Rs 599
          </div>
          <div className="relative aspect-[4/3] max-h-[300px] overflow-hidden rounded-[1rem] bg-[#20140c]">
            <Image
              src="/hero/hero-combo.png"
              alt="AI-style Zynger Club fried chicken combo with burger, fries and drink"
              width={1600}
              height={1100}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
