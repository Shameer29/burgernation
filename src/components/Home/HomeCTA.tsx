import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomeCTA({ onViewFranchise }: { onViewFranchise: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["-15%", "25%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

  return (
    <section ref={sectionRef} className="relative bg-char-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.14),transparent_60%)]" />
      <motion.div
        style={{ y: blobY1 }}
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-crush/10 blur-3xl animate-float"
      />
      <motion.div
        style={{ y: blobY2, animationDelay: "1.2s" }}
        className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-crush/10 blur-3xl animate-float"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl text-center rounded-[2.5rem] border border-crush/25 bg-gradient-to-b from-char-800/80 via-char-900 to-black px-6 py-14 sm:px-16 sm:py-20 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">BE YOUR OWN BOSS</span>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl text-off leading-[0.95]">
          OWN A <span className="text-crush">BURGER NATION</span>
        </h2>
        <p className="mt-5 text-sm sm:text-base text-off-dim leading-relaxed max-w-xl mx-auto">
          Join 15+ thriving London outlets. Turnkey setup, full training, and a proven Halal-certified
          menu that keeps customers coming back — with franchise packages from £15,000.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onViewFranchise}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-crush to-crush-dark px-8 py-3.5 text-xs tracking-[0.2em] font-bold text-black shadow-xl shadow-crush/30 hover:brightness-110 transition-all active:scale-95"
          >
            EXPLORE FRANCHISE MODELS
          </button>
        </div>
      </motion.div>
    </section>
  );
}
