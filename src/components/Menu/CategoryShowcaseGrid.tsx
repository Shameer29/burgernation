import { motion } from "framer-motion";
import type { MenuCategory } from "../../data/menu";

const CATEGORY_ICONS: Record<string, { image: string; tag: string }> = {
  smash: { image: "/dishes/truffle-smash.png", tag: "SMASH BURGERS" },
  "classic-beef": { image: "/dishes/original-plain-cheese.png", tag: "BEEF BURGERS" },
  "double-patty": { image: "/dishes/wtf.png", tag: "DOUBLE PATTY" },
  "chicken-burgers": { image: "/dishes/classic-fillet.png", tag: "CHICKEN BURGERS" },
  "peri-peri": { image: "/dishes/peri-peri-chicken.png", tag: "PERI-PERI GRILL" },
  "chicken-bites": { image: "/dishes/peri-peri-wings.png", tag: "CHICKEN BITES" },
  vegan: { image: "/dishes/hot-dog-vegano.png", tag: "VEGAN NATION" },
  kids: { image: "/dishes/kids-cheese-burger.png", tag: "KIDS NATION" },
  salad: { image: "/dishes/greek-salad.png", tag: "SALADS" },
  sides: { image: "/dishes/mozzarella-sticks.png", tag: "SIDES" },
  chips: { image: "/dishes/peri-peri-chips.png", tag: "FRIES & CHIPS" },
  shakes: { image: "/dishes/milkshake.png", tag: "MILKSHAKES" },
  sweets: { image: "/dishes/belgian-waffle.png", tag: "DESSERTS" },
};

export default function CategoryShowcaseGrid({
  categories,
  activeId,
  onSelectCategory,
}: {
  categories: MenuCategory[];
  activeId: string;
  onSelectCategory: (id: string) => void;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="text-center mb-6">
        <span className="text-xs tracking-[0.35em] text-crush font-semibold uppercase">
          OUR MENU
        </span>
        <h3 className="font-display text-2xl sm:text-4xl text-off uppercase mt-1">
          BROWSE <span className="text-crush">CATEGORIES</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
        {categories.map((cat, idx) => {
          const isActive = cat.id === activeId;
          const meta = CATEGORY_ICONS[cat.id] || {
            image: "/dishes/classic-plain-smash.png",
            tag: cat.label,
          };

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 7) * 0.04 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className={`group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border p-3 text-center transition-all duration-300 ${
                isActive
                  ? "border-crush bg-crush/15 shadow-[0_10px_25px_rgba(234,88,12,0.3)] ring-2 ring-crush/50"
                  : "border-white/10 bg-char-800/80 hover:border-crush/50 hover:bg-char-800"
              }`}
            >
              {/* Category Tag */}
              <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[8px] font-bold tracking-widest text-off-dim uppercase mb-1.5 group-hover:text-off">
                {meta.tag}
              </span>

              {/* Category Photo */}
              <div className="relative my-1.5 flex h-16 sm:h-20 w-full items-center justify-center">
                <div
                  className={`absolute h-14 w-14 rounded-full blur-xl transition-opacity duration-300 ${
                    isActive ? "bg-crush/40 opacity-80" : "bg-crush/15 opacity-40 group-hover:opacity-70"
                  }`}
                />
                <img
                  src={meta.image}
                  alt={cat.label}
                  className="relative z-10 max-h-16 sm:max-h-20 w-auto object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Title & Count */}
              <div className="mt-1.5 w-full">
                <h4
                  className={`font-display text-xs sm:text-sm leading-tight uppercase truncate px-1 transition-colors ${
                    isActive ? "text-crush font-extrabold" : "text-off group-hover:text-crush"
                  }`}
                >
                  {cat.label}
                </h4>
                <span className="text-[9px] text-off-dim tracking-wider uppercase mt-0.5 block">
                  {cat.items.length} {cat.items.length === 1 ? "ITEM" : "ITEMS"}
                </span>
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-1 bg-crush shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
