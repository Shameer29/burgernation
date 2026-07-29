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

const FILTERS = [
  { id: "all", label: "ALL ITEMS" },
  { id: "spicy", label: "🔥 SPICY" },
  { id: "vegan", label: "🌱 VEGAN" },
  { id: "beef", label: "🥩 BEEF & SMASH" },
  { id: "chicken", label: "🍗 CHICKEN" },
];

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"single" | "all">("single");
  const visibleIds = useRef(new Set<string>());

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

  // Filter categories and items based on search and tag filters
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return menuCategories
      .map((cat) => {
        const filteredItems = cat.items.filter((item) => {
          // Search query check
          const matchesQuery =
            !query ||
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query);

          // Tag filter check
          let matchesTag = true;
          if (activeFilter === "spicy") matchesTag = Boolean(item.spicy);
          else if (activeFilter === "vegan")
            matchesTag = cat.id === "vegan" || item.name.toLowerCase().includes("vegan");
          else if (activeFilter === "beef")
            matchesTag = cat.id === "smash" || cat.id === "classic-beef" || cat.id === "double-patty";
          else if (activeFilter === "chicken")
            matchesTag = cat.id === "chicken-burgers" || cat.id === "chicken-bites";

          return matchesQuery && matchesTag;
        });

        return { ...cat, items: filteredItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, activeFilter]);

  const totalMatches = useMemo(
    () => filteredCategories.reduce((sum, c) => sum + c.items.length, 0),
    [filteredCategories]
  );

  const displayedCategories = useMemo(() => {
    if (viewMode === "single" && !searchQuery && activeFilter === "all") {
      const target = filteredCategories.find((c) => c.id === activeId);
      return target ? [target] : filteredCategories.slice(0, 1);
    }
    return filteredCategories;
  }, [filteredCategories, viewMode, activeId, searchQuery, activeFilter]);

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
                className="rounded-full border border-white/10 bg-char-800 px-3.5 py-1.5 text-[9px] sm:text-[10px] tracking-[0.18em] text-off-dim font-medium shadow-sm"
              >
                {badge}
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

        {/* Search & Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-char-800 p-4 sm:p-5 shadow-xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-off-dim text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, sides, shakes & desserts..."
              className="w-full rounded-xl border border-white/10 bg-char-900/80 py-3 fill-none pl-11 pr-4 text-sm text-off placeholder-off-dim focus:border-crush focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-off-dim hover:text-off"
              >
                ✕ CLEAR
              </button>
            )}
          </div>

          {/* Quick Filter Tag Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wider transition-all ${
                  activeFilter === f.id
                    ? "border-crush bg-crush text-black font-bold shadow-md shadow-crush/20"
                    : "border-white/10 bg-char-900/60 text-off-dim hover:border-crush/50 hover:text-off"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <SauceStrip />
      </div>

      {/* Sticky Category Navigation */}
      <CategoryNav categories={menuCategories} activeId={activeId} onSelect={handleSelectCategory} />

      {/* View Mode Toggle */}
      <div id="menu-items-anchor" className="mx-auto max-w-6xl px-5 sm:px-8 pt-4 pb-6 flex items-center justify-between border-b border-white/10">
        <span className="text-xs tracking-[0.2em] text-crush font-extrabold uppercase">
          {viewMode === "single" && !searchQuery && activeFilter === "all"
            ? menuCategories.find((c) => c.id === activeId)?.label || "MENU ITEMS"
            : "FULL MENU"}
        </span>

        <div className="flex items-center gap-1.5 bg-char-800 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setViewMode("single")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
              viewMode === "single"
                ? "bg-crush text-black shadow-md"
                : "text-off-dim hover:text-off"
            }`}
          >
            CATEGORY VIEW
          </button>
          <button
            onClick={() => setViewMode("all")}
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
        {displayedCategories.length > 0 ? (
          displayedCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onSelectItem={(item) => setSelectedDish(item)}
            />
          ))
        ) : (
          <div className="my-16 text-center py-16 border border-white/10 rounded-2xl bg-char-800">
            <p className="text-2xl font-display text-off mb-2">NO DISHES MATCHED YOUR SEARCH</p>
            <p className="text-sm text-off-dim mb-6">
              Try searching for something else or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="rounded-full bg-crush px-6 py-2.5 text-xs font-bold tracking-widest text-black"
            >
              RESET FILTERS ({totalMatches})
            </button>
          </div>
        )}
      </div>

      {/* 3D Dish Showcase Modal */}
      <DishShowcaseModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
