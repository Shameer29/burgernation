import { motion } from "framer-motion";
import { useState, useRef } from "react";
import type { MenuItem } from "../../data/menu";

export default function MenuCard({
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

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
        className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-char-800/95 via-char-900 to-black p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 ease-out shadow-2xl hover:border-crush/70 hover:shadow-[0_30px_70px_rgba(234,88,12,0.32)]"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${isHovered ? 1.02 : 1}, ${
            isHovered ? 1.02 : 1
          }, 1)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Cursor Spotlight Aura */}
        <div
          className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, #ff5a00 0%, transparent 60%)`,
          }}
        />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
          <span className="rounded-full bg-crush/20 border border-crush/40 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-crush uppercase">
            ★ FEATURED SIGNATURE
          </span>
          {item.price && (
            <span className="rounded-full bg-white/10 border border-white/20 px-4 py-1 font-display text-lg sm:text-xl text-off font-extrabold tracking-wide shadow-md">
              {item.price}
            </span>
          )}
        </div>

        {/* 3D Levitating Transparent Dish Asset */}
        <div className="relative my-4 flex h-56 sm:h-60 w-full items-center justify-center">
          {/* Floating background glowing aura */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-crush/25 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-crush/40" />
          </div>

          <motion.img
            src={item.image || "/burger/patty.png"}
            alt={item.name}
            className="relative z-10 max-h-52 sm:max-h-56 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
            style={{
              transform: isHovered ? "translateZ(45px) translateY(-10px)" : "translateZ(0px)",
              transformStyle: "preserve-3d",
            }}
          />

          {/* Hover Floating Embers & Particle Wisps */}
          {isHovered && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <span className="absolute -top-2 left-1/4 h-2 w-2 rounded-full bg-crush animate-ping opacity-75" />
              <span className="absolute bottom-2 right-1/4 h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="absolute top-1/2 right-6 h-1 w-1 rounded-full bg-orange-300 animate-ping" />
            </div>
          )}
        </div>

        {/* Bottom Details */}
        <div className="relative z-10 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-off uppercase leading-tight group-hover:text-crush transition-colors">
              {item.name}
            </h3>

            {(item.note || item.spicy) && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {item.note && (
                  <span className="rounded-full border border-crush/40 px-2.5 py-0.5 text-[10px] tracking-[0.15em] text-crush font-semibold">
                    {item.note}
                  </span>
                )}
                {item.spicy && (
                  <span className="text-sm text-crush" aria-label={`Spice level ${item.spicy} of 3`}>
                    {"🌶".repeat(item.spicy)}
                  </span>
                )}
              </div>
            )}

            {item.description && (
              <p className="mt-3 text-xs sm:text-sm text-off-dim leading-relaxed line-clamp-2">
                {item.description}
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs tracking-[0.2em] text-green-400 font-extrabold uppercase">
              ★ FREE SAUCE INCLUDED
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-crush/40 bg-crush px-5 py-2.5 text-xs font-extrabold tracking-widest text-black uppercase transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:scale-105">
              CUSTOMIZE & ORDER &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
