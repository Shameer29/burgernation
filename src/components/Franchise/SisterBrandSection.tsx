import React from "react";
import { motion } from "framer-motion";

interface SisterBrandSectionProps {
  onOpenModal: () => void;
}

interface SisterBrand {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  images: { src: string; label: string }[];
}

const SISTER_BRANDS: SisterBrand[] = [
  {
    id: "chicano",
    name: "CHICANO",
    tagline: "Chicken Done Right",
    blurb: "Our sister QSR concept serving fried chicken, wings, burgers, wraps, and peri-peri grills.",
    images: [
      { src: "/chicano1.jpeg", label: "STOREFRONT" },
      { src: "/chicano2.jpeg", label: "COUNTER & MENU" },
    ],
  },
  {
    id: "dzert",
    name: "DZERT",
    tagline: "For Heaven's Sake!",
    blurb: "A dessert & cafe concept serving crepes, waffles, shakes, coffee, wraps, panini and burgers.",
    images: [{ src: "/Dzert.jpeg", label: "STOREFRONT" }],
  },
];

export const SisterBrandSection: React.FC<SisterBrandSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-crush/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-12"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">EXPAND YOUR PORTFOLIO</span>
        <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
          MULTI-BRAND <span className="text-crush">FRANCHISE GROUP</span>
        </h2>
        <p className="mt-4 text-off-dim max-w-2xl mx-auto text-sm sm:text-base">
          Beyond Burger Nation, our group also franchises these concepts — built by the same team,
          on the same proven operating system.
        </p>
      </motion.div>

      <div className="relative z-10 space-y-8">
        {SISTER_BRANDS.map((brand, idx) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-br from-char-800 via-char-900 to-black rounded-[2rem] p-6 md:p-12 border border-crush/20 shadow-2xl overflow-hidden"
          >
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-crush/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center mb-10">
              <h3 className="font-display text-3xl sm:text-5xl text-off leading-[0.9]">
                {brand.name.slice(0, 1)}
                <span className="text-crush">{brand.name.slice(1)}</span>
              </h3>
              <p className="mt-2 text-crush-light text-sm font-semibold italic">&ldquo;{brand.tagline}&rdquo;</p>
              <p className="mt-3 text-off-dim max-w-xl mx-auto text-sm">{brand.blurb}</p>
            </div>

            <div
              className={`relative z-10 grid grid-cols-1 gap-6 mb-10 mx-auto ${
                brand.images.length > 1 ? "sm:grid-cols-2 max-w-3xl" : "max-w-xl"
              }`}
            >
              {brand.images.map((img, imgIdx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, x: imgIdx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: imgIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/15 shadow-xl"
                >
                  <img
                    src={img.src}
                    alt={`${brand.name} ${img.label.toLowerCase()}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 right-4 text-[11px] tracking-wider text-off font-semibold">
                    {brand.name} — {img.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 flex justify-center">
              <button
                onClick={onOpenModal}
                className="rounded-full bg-gradient-to-r from-crush to-crush-dark px-8 py-3.5 text-xs tracking-[0.2em] font-bold text-black shadow-xl shadow-crush/30 hover:brightness-110 transition-all active:scale-95"
              >
                ENQUIRE ABOUT {brand.name} FRANCHISE
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
