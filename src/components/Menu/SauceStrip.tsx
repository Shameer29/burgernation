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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="my-16"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-char-800/95 via-char-900 to-black/90 p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Dynamic ambient background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-4/5 h-64 bg-crush/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-3/5 h-64 bg-green-500/10 blur-[120px] pointer-events-none" />

        {/* Banner header matching flyer */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 border-b border-white/10 pb-8 text-center lg:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs tracking-[0.25em] text-green-400 font-bold mb-3">
              <span>SIGNATURE DIPPING NATION</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl text-off tracking-wide uppercase">
              CHOOSE <span className="text-green-400">YOUR</span> SIGNATURE SAUCE
            </h3>
            <p className="mt-2 text-sm sm:text-base text-off-dim max-w-2xl">
              Freshly prepared dips in black ceramic ramekins. Choose your favourite with any burger, wrap, chicken dish, or fries!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-green-500/40 bg-green-500/15 px-6 py-3 text-sm sm:text-base tracking-[0.15em] text-green-300 font-extrabold shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <span>COMPLIMENTARY WITH EVERY DISH</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="relative z-10 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-10">
          {SAUCE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-crush text-black shadow-[0_0_20px_rgba(234,88,12,0.5)] scale-105"
                    : "bg-white/5 text-off-dim hover:bg-white/10 hover:text-off border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sauces Display Grid */}
        <motion.div
          layout
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSauces.map((sauce, i) => (
              <motion.div
                key={sauce.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-char-800/90 via-char-900 to-black/95 p-6 transition-all duration-300 hover:border-crush/60 hover:shadow-[0_20px_45px_rgba(234,88,12,0.25)]"
              >
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-full bg-green-500/15 border border-green-500/30 px-3 py-1 text-[10px] font-bold tracking-widest text-green-400 uppercase">
                    INCLUDED FREE
                  </span>
                  {sauce.hot && (
                    <span className="rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-[10px] font-extrabold tracking-widest text-red-400 uppercase animate-pulse">
                      VERY HOT 🔥
                    </span>
                  )}
                </div>

                {/* Free-floating Dipping Tub Image with glowing color aura */}
                <div className="relative my-4 flex h-44 sm:h-48 w-full items-center justify-center">
                  {/* Glowing color aura */}
                  <div
                    className="absolute h-32 w-32 rounded-full opacity-30 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-60"
                    style={{ backgroundColor: sauce.color }}
                  />
                  <img
                    src={sauce.image}
                    alt={sauce.name}
                    className="relative z-10 max-h-40 sm:max-h-44 w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                    loading="lazy"
                  />
                </div>

                {/* Title and description */}
                <div className="mt-2 text-center">
                  <h4 className="font-display text-xl sm:text-2xl text-off uppercase tracking-wide group-hover:text-crush transition-colors">
                    {sauce.name}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-off-dim leading-relaxed line-clamp-2">
                    {sauce.description}
                  </p>
                </div>

                {/* Bottom pill */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center">
                  <span className="text-[11px] tracking-[0.2em] font-bold text-green-400 group-hover:text-green-300 uppercase transition-colors">
                    SELECT WITH YOUR ORDER
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Guarantee footer matching flyer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs sm:text-sm tracking-[0.2em] text-green-400 font-extrabold uppercase">
            ALL ITEMS COME WITH THE SAUCE OF YOUR CHOICE — NO EXTRA CHARGE!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
