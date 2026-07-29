import { motion } from "framer-motion";
import type { MenuCategory } from "../../data/menu";

const CATEGORY_ICONS: Record<string, { image: string; tag: string }> = {
  smash: { image: "/dishes/truffle-smash.png", tag: "SIGNATURE BEEF" },
  "classic-beef": { image: "/dishes/original-plain-cheese.png", tag: "6OZ GOURMET" },
  "double-patty": { image: "/dishes/wtf.png", tag: "12OZ STACKS" },
  "chicken-burgers": { image: "/dishes/classic-fillet-burger.png", tag: "CRISPY FILLET" },
  "peri-peri": { image: "/dishes/whole-chicken.png", tag: "FLAME GRILLED" },
  "chicken-bites": { image: "/dishes/peri-peri-wings.png", tag: "WINGS & STRIPS" },
  vegan: { image: "/dishes/hot-dog-vegano.png", tag: "PLANT BASED" },
  kids: { image: "/dishes/belgian-waffle.png", tag: "KIDS & SWEETS" },
  sides: { image: "/dishes/mozzarella-sticks.png", tag: "SIDES & DIPS" },
  chips: { image: "/dishes/peri-peri-chips.png", tag: "HAND-CUT FRIES" },
  salad: { image: "/dishes/tango-ice-blast.png", tag: "SALADS & DRINKS" },
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
    <div className="mb-14 sm:mb-20">
      <div className="text-center mb-8">
        <span className="text-xs tracking-[0.35em] text-crush font-semibold uppercase">
          QUICK MENU NAVIGATION
        </span>
        <h3 className="font-display text-2xl sm:text-4xl text-off uppercase mt-2">
          EXPLORE BY <span className="text-crush">CATEGORY</span>
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-off-dim max-w-xl mx-auto">
          Select any category below to instantly view its dishes without scrolling through the entire menu.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat, idx) => {
          const isActive = cat.id === activeId;
          const meta = CATEGORY_ICONS[cat.id] || {
            image: "/burger/patty.png",
            tag: "MENU SECTION",
          };

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              className={`group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border p-4 text-center transition-all duration-300 ${
                isActive
                  ? "border-crush bg-crush/15 shadow-[0_10px_30px_rgba(234,88,12,0.3)] ring-2 ring-crush/50"
                  : "border-white/10 bg-char-800/80 hover:border-crush/50 hover:bg-char-800"
              }`}
            >
              {/* Category Tag */}
              <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-off-dim uppercase mb-2 group-hover:text-off">
                {meta.tag}
              </span>

              {/* Category Photo */}
              <div className="relative my-2 flex h-20 sm:h-24 w-full items-center justify-center">
                <div
                  className={`absolute h-16 w-16 rounded-full blur-xl transition-opacity duration-300 ${
                    isActive ? "bg-crush/40 opacity-80" : "bg-crush/15 opacity-40 group-hover:opacity-70"
                  }`}
                />
                <img
                  src={meta.image}
                  alt={cat.label}
                  className="relative z-10 max-h-20 sm:max-h-24 w-auto object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title & Count */}
              <div className="mt-2">
                <h4
                  className={`font-display text-sm sm:text-base leading-tight uppercase transition-colors ${
                    isActive ? "text-crush font-extrabold" : "text-off group-hover:text-crush"
                  }`}
                >
                  {cat.label}
                </h4>
                <span className="text-[10px] text-off-dim tracking-wider uppercase mt-1 block">
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
