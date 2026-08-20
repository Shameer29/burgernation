import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ORDER_URL } from "../../data/orderLinks";

const springCfg = { type: "spring" as const, stiffness: 210, damping: 22 };

function BurgerGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 26c0-3 4-5 18-5s18 2 18 5-8 4-18 4-18-1-18-4z" fill="#111111" />
      <rect x="13" y="32" width="38" height="5" rx="2.5" fill="#111111" />
      <path d="M13 41c0-2 8-3 19-3s19 1 19 3-8 5-19 5-19-3-19-5z" fill="#111111" />
    </svg>
  );
}

export default function OrderFab() {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
  const width = expanded ? 184 : 56;

  useEffect(() => {
    const target = document.getElementById("menu");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setExpanded(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50">
      <div className="relative h-14" style={{ width }}>
        {/* filtered layer: pill shape + shred blobs that metaball-merge on hover */}
        <div className="goo absolute inset-0" style={{ willChange: "transform" }}>
          <motion.div
            animate={{ width }}
            transition={springCfg}
            className="absolute inset-y-0 right-0 h-14 rounded-full bg-crush"
          />
          <motion.span
            className="absolute right-3 top-0 h-3.5 w-3.5 rounded-full bg-crush"
            animate={
              hover
                ? { x: -4, y: -8, scale: 1.3, opacity: 1 }
                : { x: 6, y: -18, scale: 0.55, opacity: 0.85 }
            }
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
          />
          <motion.span
            className="absolute right-7 bottom-0 h-2.5 w-2.5 rounded-full bg-crush"
            animate={
              hover
                ? { x: -2, y: 6, scale: 1.15, opacity: 1 }
                : { x: 10, y: 16, scale: 0.5, opacity: 0.8 }
            }
            transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.03 }}
          />
        </div>

        {/* crisp, unfiltered label layer sitting exactly on top of the pill */}
        <motion.div
          animate={{ width }}
          transition={springCfg}
          className="pointer-events-none absolute inset-y-0 right-0 flex h-14 items-center justify-center overflow-hidden rounded-full"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {expanded ? (
              <motion.span
                key="label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap px-5 text-xs font-bold tracking-[0.2em] text-char-950"
              >
                ORDER NOW
              </motion.span>
            ) : (
              <motion.span
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <BurgerGlyph />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* real click target, invisible, matches the pill bounds */}
        <button
          type="button"
          aria-label="Order now"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => window.open(ORDER_URL, "_blank", "noopener,noreferrer")}
          className="absolute inset-y-0 right-0 h-14 w-full rounded-full cursor-pointer shadow-[0_10px_30px_rgba(255,90,0,0.4)]"
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  );
}
