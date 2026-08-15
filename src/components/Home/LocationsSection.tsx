import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LOCATIONS = [
  {
    line1: "34 Roman Bank",
    line2: "Skegness",
    postcode: "PE25 2SJ",
  },
  {
    line1: "203 Godstone Road",
    line2: "Whyteleafe",
    postcode: "CR3 0EL",
  },
  {
    line1: "276 Minster Road",
    line2: "Sheerness-on-Sea",
    postcode: "ME12 3LR",
  },
];

export default function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={sectionRef} className="relative bg-char-950 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden border-t border-white/5">
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute bottom-0 right-0 h-[35vh] w-[35%] max-w-[450px] translate-x-1/3 rounded-full bg-crush/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 flex flex-col items-center text-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">FIND US</span>
          <h2 className="font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            OUR <span className="text-crush">LOCATIONS</span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-off-dim">
            Walk in, order online, or find your nearest Burger Nation below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {LOCATIONS.map((loc, index) => (
            <motion.div
              key={loc.postcode}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-char-800/95 via-char-900 to-black p-6 flex flex-col gap-4 shadow-2xl transition-all duration-300 hover:border-crush/70 hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-crush/40 bg-crush/10 text-crush">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5-4.5-7-8.14-7-11.5A7 7 0 0 1 19 9.5C19 12.86 16.5 16.5 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <h3 className="font-display text-lg text-off uppercase tracking-wide group-hover:text-crush transition-colors">
                  Burger Nation
                </h3>
                <p className="mt-2 text-sm text-off-dim leading-relaxed">
                  {loc.line1}
                  <br />
                  {loc.line2}
                  <br />
                  {loc.postcode}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Burger Nation, ${loc.line1}, ${loc.line2}, ${loc.postcode}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-crush hover:text-crush-light transition-colors uppercase"
              >
                Get Directions &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
