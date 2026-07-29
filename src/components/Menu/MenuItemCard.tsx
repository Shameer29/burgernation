import { motion } from "framer-motion";
import { useState, useRef } from "react";
import type { MenuItem } from "../../data/menu";

export default function MenuItemCard({
  item,
  index,
  onSelect,
}: {
  item: MenuItem;
  index: number;
  onSelect?: (item: MenuItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotX(rX);
    setRotY(rY);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer h-full"
      onClick={() => onSelect?.(item)}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-char-800/95 via-char-900/95 to-black p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 ease-out shadow-xl hover:border-crush/70 hover:shadow-[0_25px_60px_rgba(234,88,12,0.28)]"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${isHovered ? 1.02 : 1}, ${
            isHovered ? 1.02 : 1
          }, 1)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top Feature Tag & Price Pill */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
          {item.note ? (
            <span className="rounded-full bg-crush/15 border border-crush/40 px-3 py-1 text-[10px] font-extrabold tracking-widest text-crush uppercase">
              {item.note}
            </span>
          ) : (
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-off-dim uppercase">
              FRESH TO ORDER
            </span>
          )}

          {item.price && (
            <span className="rounded-full bg-crush/15 border border-crush/40 px-3.5 py-1 font-display text-base sm:text-lg text-crush font-extrabold tracking-wide">
              {item.price}
            </span>
          )}
        </div>

        {/* Dynamic Cursor Spotlight Aura */}
        <div
          className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-35"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, #ff5a00 0%, transparent 65%)`,
          }}
        />

        {/* 3D Levitating Free-Floating Dish Asset */}
        <div className="relative my-4 flex h-52 sm:h-56 w-full items-center justify-center">
          {/* Ambient radial glow */}
          <div className="absolute h-36 w-36 rounded-full bg-crush/20 blur-2xl transition-all duration-500 group-hover:bg-crush/40 group-hover:scale-150" />

          <img
            src={item.image || "/burger/patty.png"}
            alt={item.name}
            className="relative z-10 max-h-48 sm:max-h-52 w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2.5"
            style={{
              transform: isHovered ? "translateZ(35px)" : "translateZ(0px)",
              transformStyle: "preserve-3d",
            }}
            loading="lazy"
          />

          {/* Sparkle Embers on Hover */}
          {isHovered && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <span className="absolute top-3 left-8 h-2 w-2 rounded-full bg-crush animate-ping opacity-80" />
              <span className="absolute bottom-4 right-8 h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
            </div>
          )}
        </div>

        {/* Bottom details */}
        <div className="relative z-10 flex flex-col flex-1 justify-between">
          <div className="text-center sm:text-left">
            <h4 className="font-display text-xl sm:text-2xl text-off uppercase tracking-wide group-hover:text-crush transition-colors leading-tight">
              {item.name}
            </h4>

            {item.spicy && (
              <div className="mt-1 flex items-center justify-center sm:justify-start gap-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">SPICE:</span>
                <span className="text-sm text-crush" aria-label={`Spice level ${item.spicy} of 3`}>
                  {"🌶".repeat(item.spicy)}
                </span>
              </div>
            )}

            {item.description && (
              <p className="mt-2.5 text-xs sm:text-sm text-off-dim leading-relaxed line-clamp-2">
                {item.description}
              </p>
            )}
          </div>

          {/* Action Button Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs tracking-[0.2em] font-bold text-off-dim uppercase group-hover:text-off transition-colors">
              INCLUDES FREE SAUCE
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 group-hover:border-crush group-hover:bg-crush px-4 py-2 text-xs font-extrabold tracking-wider text-off group-hover:text-black uppercase transition-all duration-300">
              CUSTOMIZE &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
