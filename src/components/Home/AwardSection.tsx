import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AwardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} className="relative bg-char-950 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden border-t border-white/5">
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute top-0 right-0 h-[35vh] w-[40%] max-w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-crush/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 flex flex-col items-center text-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">RECOGNISED EXCELLENCE</span>
          <h2 className="font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            AWARD-NOMINATED <span className="text-crush">&amp; CERTIFIED</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-off-dim">
            Our Double Bacon Jam Smash was nominated for Best Burger in South London at the
            National Burger Awards 2025 — officially certified, seriously earned.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-crush/30 shadow-2xl"
          >
            <img
              src="/double-bacon-jam-smash.jpeg"
              alt="Double Bacon Jam Smash — nominated for Best Burger in South London"
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-[11px] tracking-wider text-off font-semibold">
              DOUBLE BACON JAM SMASH
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-crush/30 shadow-2xl"
          >
            <img
              src="/finalist-certificate.jpeg"
              alt="National Burger Awards 2025 Finalist certificate — Burger Nation"
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute top-4 left-4 rounded-full border border-crush/40 bg-black/60 backdrop-blur-sm px-3 py-1 text-[10px] tracking-[0.15em] text-crush font-bold">
              2025 FINALIST
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
