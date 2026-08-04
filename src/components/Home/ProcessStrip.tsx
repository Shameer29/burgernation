import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Hand-Pressed",
    copy: "100% Halal Angus beef, hand-pressed fresh in-house — never frozen patties, never shortcuts."
  },
  {
    number: "02",
    title: "Flame-Fired",
    copy: "Seared hot and fast for a proper crust, locking in the juice and the smoke."
  },
  {
    number: "03",
    title: "Freshly Stacked",
    copy: "Toasted brioche, house sauces, and crisp veg — layered to order, every single time."
  },
  {
    number: "04",
    title: "Boxed in Minutes",
    copy: "From grill to box fast, so it lands on your table hot, not sitting under a heat lamp."
  }
];

export default function ProcessStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={sectionRef} className="relative bg-char-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden border-t border-white/5">
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute top-1/4 left-0 h-[35vh] w-[35%] max-w-[450px] -translate-x-1/3 rounded-full bg-crush/8 blur-3xl"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20 flex flex-col items-center text-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">HOW WE BUILD IT</span>
          <h2 className="font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            FIRE TO <span className="text-crush">BOX</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {/* Connecting line for desktop */}
          <div className="pointer-events-none absolute top-6 left-0 right-0 hidden lg:block h-px bg-gradient-to-r from-transparent via-crush/30 to-transparent" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center gap-4 group"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-crush/40 bg-char-950 font-display text-lg text-crush shadow-[0_0_0_4px_rgba(15,16,21,1)] transition-all duration-300 group-hover:scale-110 group-hover:border-crush group-hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]">
                {step.number}
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-off uppercase tracking-wide group-hover:text-crush transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-off-dim leading-relaxed max-w-[220px]">{step.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
