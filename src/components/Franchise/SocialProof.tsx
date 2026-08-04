import React from "react";
import { motion } from "framer-motion";
import { CUSTOMER_REVIEWS } from "../../data/franchise";

export const SocialProof: React.FC = () => {
  return (
    <section id="reviews-social" className="relative py-16 px-4 max-w-7xl mx-auto space-y-16 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-crush/10 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">SOCIAL PROOF</span>
        <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
          WHAT CUSTOMERS SAY ABOUT <span className="text-crush">BURGER NATION</span>
        </h2>
        <p className="mt-4 text-off-dim max-w-2xl mx-auto text-sm sm:text-base">
          Real feedback from real customers on Google Reviews.
        </p>
      </motion.div>

      {/* Verified Google Customer Reviews Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {CUSTOMER_REVIEWS.map((rev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-b from-char-800/95 via-char-900 to-black p-6 rounded-[1.75rem] border border-white/10 flex flex-col justify-between hover:border-crush/50 hover:-translate-y-1 transition-all duration-300 shadow-2xl"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex text-crush space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-[10px] text-off-dim bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  {rev.date}
                </span>
              </div>
              <p className="text-xs text-off-dim italic leading-relaxed mb-4">&ldquo;{rev.comment}&rdquo;</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-display text-sm text-off tracking-wide">{rev.name}</span>
              {rev.verified && (
                <span className="text-[10px] text-emerald-400 flex items-center font-medium">
                  ✓ Verified Customer
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
