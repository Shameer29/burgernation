import { motion } from "framer-motion";
import { menuCategories } from "../../data/menu";

const SIGNATURE_IDS = ["signature-burger", "double-trouble", "chicken-fiery", "smoky-salmon-burger"];

const ALL_ITEMS = menuCategories.flatMap((c) => c.items);
const SIGNATURE_ITEMS = SIGNATURE_IDS
  .map((id) => ALL_ITEMS.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

export default function SignatureItems({ onViewMenu }: { onViewMenu: () => void }) {
  return (
    <section className="relative bg-char-950 py-20 sm:py-28 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 flex flex-col items-center text-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">FAN FAVOURITES</span>
          <h2 className="font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            SIGNATURE <span className="text-crush">ITEMS</span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-off-dim">
            The burgers that put us on the map — smashed, stacked, and always fired fresh.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNATURE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-char-800/95 via-char-900 to-black p-5 flex flex-col shadow-2xl transition-all duration-300 hover:border-crush/70 hover:-translate-y-1"
            >
              {item.note && (
                <span className="absolute top-4 left-4 z-10 rounded-full border border-crush/40 bg-crush/20 px-2.5 py-0.5 text-[10px] tracking-[0.15em] text-crush font-bold">
                  {item.note}
                </span>
              )}

              <div className="relative my-2 flex h-40 w-full items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-28 w-28 rounded-full bg-crush/25 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-crush/40" />
                </div>
                <img
                  src={item.image || "/burger/patty.png"}
                  alt={item.name}
                  className="relative z-10 max-h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="font-display text-xl text-off uppercase leading-tight group-hover:text-crush transition-colors">
                {item.name}
              </h3>
              {item.description && (
                <p className="mt-2 text-xs text-off-dim leading-relaxed line-clamp-2 flex-1">
                  {item.description}
                </p>
              )}

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                {item.price && (
                  <span className="font-display text-lg text-crush font-extrabold">{item.price}</span>
                )}
                <button
                  type="button"
                  onClick={onViewMenu}
                  className="text-[11px] font-bold tracking-wider text-off-dim hover:text-crush transition-colors uppercase"
                >
                  Order &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={onViewMenu}
            className="rounded-full bg-crush px-8 py-3.5 text-xs tracking-[0.2em] font-bold text-black shadow-xl shadow-crush/30 hover:bg-crush-light transition-all active:scale-95"
          >
            EXPLORE FULL MENU ↓
          </button>
        </div>
      </div>
    </section>
  );
}
