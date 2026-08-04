import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRANCHISE_FAQS, type FAQItem } from "../../data/franchise";

export const FranchiseFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Setup", "Financials", "Marketing", "General"];

  const filteredFaqs = activeCategory === "All"
    ? FRANCHISE_FAQS
    : FRANCHISE_FAQS.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="relative py-16 px-4 max-w-5xl mx-auto space-y-12 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-crush/10 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">GOT QUESTIONS?</span>
        <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
          FREQUENTLY ASKED <span className="text-crush">QUESTIONS</span>
        </h2>
        <p className="mt-4 text-off-dim max-w-xl mx-auto text-sm sm:text-base">
          Everything you need to know about starting, financing, and scaling your BURGER NATION
          franchise.
        </p>
      </motion.div>

      {/* Category Pills */}
      <div className="relative flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(0);
              }}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors duration-200 ${
                isActive
                  ? "text-black"
                  : "bg-char-900 text-off-dim border border-white/10 hover:border-crush/30 hover:text-off"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="faq-cat-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-xl bg-crush shadow-lg shadow-crush/20"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <div className="relative space-y-4">
        {filteredFaqs.map((faq: FAQItem, idx: number) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={`${activeCategory}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[1.5rem] border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? "bg-char-800/90 border-crush/50 shadow-lg shadow-crush/5"
                  : "bg-char-900/60 border-white/10 hover:border-crush/30"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center space-x-4"
              >
                <span className="font-display text-base md:text-lg text-off">{faq.question}</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-crush text-black rotate-180" : "bg-white/10 text-off-dim"
                  }`}
                >
                  ↓
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 pt-0 text-sm text-off-dim leading-relaxed border-t border-white/5">
                      <p className="mt-3">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
