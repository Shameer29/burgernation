import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 15, suffix: "+", label: "LONDON OUTLETS" },
  { value: 20, suffix: "+", label: "YEARS IN F&B" },
  { value: 100, suffix: "%", label: "HALAL CERTIFIED" }
];

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <div className="flex flex-col items-center text-center">
      <span ref={ref} className="font-display text-4xl sm:text-5xl text-crush leading-none">
        {display}
        {suffix}
      </span>
      <span className="mt-2 text-[10px] sm:text-xs tracking-[0.25em] text-off-dim font-semibold">{label}</span>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section ref={sectionRef} className="relative bg-char-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <motion.div
        style={{ y: blobY1 }}
        className="pointer-events-none absolute top-0 left-1/2 h-[40vh] w-[60%] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crush/10 blur-3xl"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="pointer-events-none absolute bottom-0 right-0 h-[30vh] w-[40%] max-w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-crush/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-10 items-center">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">OUR STORY</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            ABOUT <span className="text-crush">BURGER NATION</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-off-dim leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Burger Nation is a British-born QSR concept built on one rule: zero compromise. Every patty
            is hand-pressed from 100% Halal-certified Angus beef, every fillet is freshly breaded to
            order, and every bun is toasted to a proper crust — served fast, without cutting corners.
          </p>
          <p className="mt-4 text-sm sm:text-base text-off-dim leading-relaxed max-w-2xl mx-auto lg:mx-0">
            From our home restaurant on 261 High Street, Orpington, to a growing network of franchise
            locations across London, we're on a mission to bring seriously good, seriously fun burgers
            to every high street in the nation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            {["100% HALAL CERTIFIED", "PREMIUM ANGUS BEEF", "HAND-PRESSED DAILY", "MADE WITH LOVE"].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-crush/30 bg-crush/10 px-4 py-1.5 text-[11px] font-bold tracking-wider text-crush"
              >
                &#10003; {badge}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 max-w-lg mx-auto lg:mx-0">
            {STATS.map((stat, i) => (
              <StatCounter key={stat.label} {...stat} delay={i * 0.15} />
            ))}
          </div>
        </motion.div>

        {/* Decorative burger stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-[280px] sm:h-[360px] w-full max-w-sm items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-52 w-52 sm:h-64 sm:w-64 rounded-full bg-crush/20 blur-3xl animate-float" />
          </div>
          <div className="relative flex flex-col items-center -space-y-6 sm:-space-y-8">
            <img src="/burger/top-bun.png" alt="" className="w-40 sm:w-52 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
            <img src="/burger/pickles.png" alt="" className="w-36 sm:w-48 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
            <img src="/burger/cheese.png" alt="" className="w-40 sm:w-52 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
            <img src="/burger/patty.png" alt="" className="w-40 sm:w-52 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
            <img src="/burger/bottom-bun.png" alt="BURGER NATION signature stack" className="w-40 sm:w-52 drop-shadow-[0_14px_24px_rgba(0,0,0,0.7)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
