import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SAUCES, type MenuItem } from "../../data/menu";

interface DishShowcaseModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function DishShowcaseModal({ item, onClose }: DishShowcaseModalProps) {
  const [selectedSauce, setSelectedSauce] = useState(SAUCES[0].name);
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleOrder = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-char-800 p-6 sm:p-10 shadow-2xl shadow-crush/20"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-off hover:bg-crush hover:text-black transition-colors"
          >
            ✕
          </button>

          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #ff5a00, transparent 70%)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* 3D Floating Levitating Image */}
            <div className="relative flex flex-col items-center justify-center min-h-[260px] rounded-2xl bg-char-900/80 p-6 border border-white/10 overflow-hidden group">
              {/* Rotating particle ring */}
              <div className="absolute inset-0 border border-crush/20 rounded-2xl animate-pulse" />
              
              <motion.img
                animate={{
                  y: [-10, 10, -10],
                  rotateZ: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={item.image || "/burger/patty.png"}
                alt={item.name}
                className="max-h-56 w-auto object-contain drop-shadow-[0_20px_35px_rgba(255,90,0,0.35)]"
              />

              {item.spicy && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border border-crush/40 bg-char-900/90 px-3 py-1 text-xs text-crush font-semibold shadow-lg">
                  <span>🔥 SPICE LEVEL {item.spicy}/3</span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {item.note && (
                    <span className="rounded-full border border-crush/40 bg-crush/10 px-3 py-0.5 text-[10px] tracking-[0.2em] text-crush font-bold">
                      {item.note}
                    </span>
                  )}
                  <img src="/logo.png" alt="BURGER NATION" className="h-6 w-auto object-contain" />
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-off leading-none">{item.name}</h3>

                {item.price && (
                  <div className="mt-3 font-display text-3xl text-crush font-bold">{item.price}</div>
                )}

                <p className="mt-4 text-sm text-off-dim leading-relaxed">
                  {item.description || "Handcrafted with premium flame-grilled ingredients, cooked fresh to order with house signature spices and brioche bun."}
                </p>
              </div>

              {/* Sauce Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] tracking-[0.2em] text-off font-semibold block">
                    CHOOSE YOUR FREE SIGNATURE SAUCE:
                  </label>
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">INCLUDED WITH MEAL</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                  {SAUCES.map((sauce) => (
                    <button
                      key={sauce.name}
                      onClick={() => setSelectedSauce(sauce.name)}
                      className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                        selectedSauce === sauce.name
                          ? "border-crush bg-crush/20 text-off font-bold shadow-[0_0_12px_rgba(234,88,12,0.4)]"
                          : "border-white/10 bg-white/5 text-off-dim hover:border-crush/60 hover:bg-white/10"
                      }`}
                    >
                      <img
                        src={sauce.image}
                        alt={sauce.name}
                        className="w-8 h-8 object-contain shrink-0 drop-shadow-md"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs truncate">{sauce.name}</span>
                        {sauce.hot && (
                          <span className="text-[9px] text-red-400 font-bold tracking-widest uppercase">
                            VERY HOT 🔥
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Order Button */}
              <button
                onClick={handleOrder}
                className="relative mt-8 w-full overflow-hidden rounded-xl bg-crush py-4 text-xs tracking-[0.25em] font-bold text-black shadow-lg shadow-crush/30 hover:bg-orange-400 transition-all active:scale-95"
              >
                {added ? "✓ ADDED TO BASKET!" : `ADD ${item.name.toUpperCase()} TO BASKET`}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
