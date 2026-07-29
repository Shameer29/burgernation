import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { menuCategories, type MenuItem } from "../../data/menu";
import CategoryNav from "./CategoryNav";
import CategorySection from "./CategorySection";
import CategoryShowcaseGrid from "./CategoryShowcaseGrid";
import SauceStrip from "./SauceStrip";
import DishShowcaseModal from "./DishShowcaseModal";

const SCROLL_OFFSET = 132;
const TRUST_BADGES = ["HALAL CERTIFIED", "PREMIUM INGREDIENTS", "FRESHLY MADE", "MADE WITH LOVE"];

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "all">("single");
  const visibleIds = useRef(new Set<string>());
  const isClickingRef = useRef(false);

  useEffect(() => {
    if (viewMode === "single") return;
    const targets = menuCategories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id);
          } else {
            visibleIds.current.delete(entry.target.id);
          }
        });
        if (isClickingRef.current) return;
        const firstVisible = menuCategories.find((c) => visibleIds.current.has(c.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -65% 0px`, threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [viewMode]);

  const handleSelectCategory = (id: string) => {
    setActiveId(id);
    isClickingRef.current = true;
    setTimeout(() => {
      isClickingRef.current = false;
    }, 1200);

    if (viewMode === "single") {
      const el = document.getElementById("menu-items-anchor");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const displayedCategories = useMemo(() => {
    if (viewMode === "single") {
      const target = menuCategories.find((c) => c.id === activeId);
      return target ? [target] : menuCategories.slice(0, 1);
    }
    return menuCategories;
  }, [viewMode, activeId]);

  return (
    <section id="menu" className="relative bg-char-900 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 flex flex-col items-center text-center mx-auto gap-4 max-w-3xl"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">THE FULL MENU</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-off leading-[0.9]">
            BURGER <span className="text-crush">NATION</span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-off-dim">
            Halal-certified, flame-grilled and smash-pressed daily at 261 High Street, Orpington.
            Hover over any dish to see 3D levitation &amp; interactive ingredients.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-off-dim"
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Visual Category Showcase Grid */}
        <CategoryShowcaseGrid
          categories={menuCategories}
          activeId={activeId}
          onSelectCategory={handleSelectCategory}
        />

        <SauceStrip />
      </div>

      {/* Sticky Category Navigation */}
      <CategoryNav categories={menuCategories} activeId={activeId} onSelect={handleSelectCategory} />

      {/* View Mode Toggle */}
      <div id="menu-items-anchor" className="mx-auto max-w-6xl px-5 sm:px-8 pt-4 pb-6 flex items-center justify-between border-b border-white/10">
        <span className="text-xs tracking-[0.2em] text-crush font-extrabold uppercase">
          {viewMode === "single"
            ? menuCategories.find((c) => c.id === activeId)?.label || "MENU ITEMS"
            : "FULL MENU"}
        </span>

        <div className="flex items-center gap-1.5 bg-char-800 p-1 rounded-full border border-white/10">
          <button
            onClick={() => {
              setViewMode("single");
              const el = document.getElementById("menu-items-anchor");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 140;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
              viewMode === "single"
                ? "bg-crush text-black shadow-md"
                : "text-off-dim hover:text-off"
            }`}
          >
            CATEGORY VIEW
          </button>
          <button
            onClick={() => {
              setViewMode("all");
              const el = document.getElementById("menu-items-anchor");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 140;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
              viewMode === "all"
                ? "bg-crush text-black shadow-md"
                : "text-off-dim hover:text-off"
            }`}
          >
            ALL CATEGORIES
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {displayedCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onSelectItem={(item) => setSelectedDish(item)}
          />
        ))}
      </div>

      {/* 3D Dish Showcase Modal */}
      <DishShowcaseModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
