import { motion } from "framer-motion";
import type { MenuCategory, MenuItem } from "../../data/menu";
import MenuCard from "./MenuCard";
import MenuItemCard from "./MenuItemCard";

export default function CategorySection({
  category,
  onSelectItem,
}: {
  category: MenuCategory;
  onSelectItem?: (item: MenuItem) => void;
}) {
  return (
    <section
      id={category.id}
      data-menu-category
      className="scroll-mt-36 border-t border-white/10 py-16 sm:py-20 first:border-t-0 first:pt-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-10 sm:mb-14"
      >
        {/* Sub-tag badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-crush/30 bg-crush/10 px-4 py-1.5 text-xs font-extrabold tracking-[0.25em] text-crush uppercase mb-4">
          <span>BURGER NATION COLLECTION</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-4xl sm:text-6xl text-off uppercase tracking-wide leading-none">
            {category.title}
          </h2>
          {category.priceLabel && (
            <span className="rounded-full bg-white/10 border border-white/20 px-5 py-1.5 font-display text-2xl sm:text-3xl text-crush font-extrabold shadow-lg">
              {category.priceLabel}
            </span>
          )}
        </div>

        {/* Gradient accent line */}
        <div className="my-5 h-1 w-40 rounded-full bg-gradient-to-r from-crush via-orange-500 to-transparent" />

        {category.subtitle && (
          <p className="max-w-3xl text-base sm:text-lg text-off-dim leading-relaxed font-normal">
            {category.subtitle}
          </p>
        )}
      </motion.div>

      <div
        className={
          category.featured
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
            : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        }
      >
        {category.items.map((item, i) =>
          category.featured ? (
            <MenuCard key={item.id} item={item} index={i} onSelect={onSelectItem} />
          ) : (
            <MenuItemCard key={item.id} item={item} index={i} onSelect={onSelectItem} />
          )
        )}
      </div>
    </section>
  );
}
