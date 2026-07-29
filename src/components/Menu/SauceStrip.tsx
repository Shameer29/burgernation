import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SAUCES } from "../../data/menu";

const SAUCE_TABS = [
  { id: "all", label: "ALL SAUCES (11)" },
  { id: "hot", label: "VERY HOT 🔥" },
  { id: "creamy", label: "CREAMY & CLASSIC" },
  { id: "glaze", label: "GLAZES & BBQ" },
];

export default function SauceStrip() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSauces = SAUCES.filter((sauce) => {
    if (activeTab === "hot") return sauce.hot;
    if (activeTab === "creamy")
      return ["OG Classic", "Truffle Mayo", "Chipotle", "Parmesan"].includes(sauce.name);
    if (activeTab === "glaze")
      return ["Buffalo Sauce", "Korean Hot Honey", "Bulls Eye BBQ", "Lemon & Herb"].includes(sauce.name);
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="my-10 sm:my-14"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-char-800/95 via-char-900 to-black/90 p-5 sm:p-8 shadow-2xl">
        {/* Dynamic ambient background glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-4/5 h-48 bg-crush/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-3/5 h-48 bg-green-500/10 blur-[100px] pointer-events-none" />

        {/* Compact Banner header */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-5 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] tracking-[0.2em] text-green-400 font-bold mb-2">
              <span>SIGNATURE DIPPING NATION</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-off tracking-wide uppercase">
              CHOOSE <span className="text-green-400">YOUR</span> SIGNATURE SAUCE
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-off-dim max-w-xl">
              Freshly prepared house dips in black ceramic ramekins — Complimentary with every order.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-green-500/40 bg-green-500/15 px-4 py-2 text-xs sm:text-sm tracking-wider text-green-300 font-extrabold shadow-sm">
              <span>COMPLIMENTARY WITH DISHES</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="relative z-10 flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 mb-6">
          {SAUCE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-crush text-black shadow-md scale-105"
                    : "bg-white/5 text-off-dim hover:bg-white/10 hover:text-off border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Compact Responsive Sauce Grid - 3 columns on phone, 4 on tablet, 6 on desktop */}
        <motion.div
          layout
          className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSauces.map((sauce, i) => (
              <motion.div
                key={sauce.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: (i % 6) * 0.03 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-char-800/90 to-black/95 p-2.5 sm:p-3 text-center transition-all duration-300 hover:border-crush/60 hover:shadow-[0_10px_25px_rgba(234,88,12,0.2)]"
              >
                {/* Hot Badge indicator */}
                <div className="absolute top-2 right-2">
                  {sauce.hot && (
                    <span className="rounded-full bg-red-500/20 border border-red-500/40 px-1.5 py-0.5 text-[8px] font-extrabold text-red-400 uppercase">
                      HOT 🔥
                    </span>
                  )}
                </div>

                {/* Dipping Tub Image */}
                <div className="relative my-1.5 flex h-14 sm:h-20 w-full items-center justify-center">
                  <div
                    className="absolute h-12 w-12 rounded-full opacity-30 blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-60"
                    style={{ backgroundColor: sauce.color }}
                  />
                  <img
                    src={sauce.image}
                    alt={sauce.name}
                    className="relative z-10 max-h-14 sm:max-h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Title & badge */}
                <div className="mt-1 w-full">
                  <h4 className="font-display text-xs sm:text-sm text-off uppercase tracking-wide truncate group-hover:text-crush transition-colors">
                    {sauce.name}
                  </h4>
                  <span className="text-[9px] font-bold text-green-400 tracking-wider uppercase block mt-0.5">
                    FREE SAUCE
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Guarantee footer */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-green-400 font-extrabold uppercase">
            ALL ITEMS COME WITH THE SAUCE OF YOUR CHOICE — NO EXTRA CHARGE!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
