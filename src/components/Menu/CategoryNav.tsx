import { motion } from "framer-motion";
import type { MenuCategory } from "../../data/menu";

export default function CategoryNav({
  categories,
  activeId,
  onSelect,
}: {
  categories: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="sticky top-[60px] sm:top-[68px] z-30 mb-12 sm:mb-16 border-y border-white/5 bg-char-900/90 backdrop-blur-md">
      <div className="scrollbar-none mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-5 py-3 sm:gap-2 sm:px-8">
        {categories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[11px] sm:text-xs tracking-[0.12em] transition-colors ${
                active ? "text-char-950" : "text-off-dim hover:text-off"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-crush"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
