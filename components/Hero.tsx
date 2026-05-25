"use client";

import Image from "next/image";
import { MotionDiv, MotionSection } from "@/components/Motion";
import { createWhatsAppLink } from "@/lib/whatsapp";

const trustBadges = ["Home Delivery", "Family Meals", "Freshly Served"];

export default function Hero() {
  return (
    <MotionSection
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-white to-orange-100 pb-12 pt-28 md:pb-18 md:pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="section-shell grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <MotionDiv
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mb-5 inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-orange-700 shadow-sm"
          >
            Kunnamkulam · Thrissur
          </MotionDiv>
          <MotionDiv initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.06, duration: 0.35 }}>
            <h1 className="font-display max-w-3xl text-5xl uppercase leading-[0.94] text-[#1F2937] min-[390px]:text-6xl md:text-7xl lg:text-8xl">
              Kunnamkulam&apos;s <span className="text-orange-600">Crispy Chicken</span> Spot
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-gray-700 md:text-xl md:leading-8">
              Burgers, fried chicken, loaded fries, wraps, shakes, mojitos and family meals — served hot from Zynger Club.
            </p>
          </MotionDiv>

          <div className="mt-7 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:flex">
            <a
              href="#menu"
              className="focus-ring min-h-12 rounded-full bg-orange-600 px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
            >
              View Menu
            </a>
            <a
              href="#menu"
              className="focus-ring min-h-12 rounded-full border-2 border-orange-600 bg-white px-6 py-4 text-center text-base font-extrabold text-orange-700 transition hover:bg-orange-50"
            >
              Order Online
            </a>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-ring min-h-12 rounded-full bg-green-600 px-6 py-4 text-center text-base font-extrabold text-white transition hover:bg-green-700 min-[390px]:col-span-2 md:col-span-1"
            >
              WhatsApp Order
            </a>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 min-[390px]:grid-cols-3">
            {trustBadges.map((badge) => (
              <div key={badge} className="rounded-2xl border border-orange-100 bg-white px-4 py-3 text-center text-sm font-extrabold text-[#1F2937] shadow-sm md:text-base">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <MotionDiv
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="relative overflow-hidden rounded-[1.6rem] bg-orange-600 p-2 shadow-xl shadow-orange-900/15"
        >
          <div className="absolute right-3 top-3 z-10 rounded-full bg-red-600 px-4 py-2 font-display text-2xl uppercase text-white shadow-lg">
            10 Pc ₹599
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-white">
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
