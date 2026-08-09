import React, { useState } from "react";
import { motion } from "framer-motion";
import { FRANCHISE_TIERS, type FranchiseTier } from "../../data/franchise";

interface InvestmentTiersProps {
  onOpenModal: (tierId?: string) => void;
}

export const InvestmentTiers: React.FC<InvestmentTiersProps> = ({ onOpenModal }) => {
  const [selectedTier, setSelectedTier] = useState<string>("high-street");

  return (
    <section id="franchise-tiers" className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-crush/10 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center mb-14"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">FRANCHISE OPPORTUNITIES</span>
        <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
          INVESTMENT <span className="text-crush">MODELS</span>
        </h2>
        <p className="mt-4 text-off-dim max-w-2xl mx-auto text-sm sm:text-base">
          Choose from 4 proven business formats designed for high profitability, rapid ROI, and low
          operational friction across prime UK high streets and retail landscapes.
        </p>
      </motion.div>

      {/* Tier Selection Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {FRANCHISE_TIERS.map((tier: FranchiseTier, idx: number) => {
          const isSelected = selectedTier === tier.id;
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative cursor-pointer rounded-[1.75rem] p-6 transition-all duration-300 border flex flex-col justify-between bg-gradient-to-b from-char-800/95 via-char-900 to-black shadow-2xl ${
                isSelected
                  ? "border-crush ring-2 ring-crush/40 shadow-[0_25px_60px_rgba(212,175,55,0.18)] -translate-y-1"
                  : "border-white/15 hover:border-crush/50 hover:-translate-y-1"
              }`}
            >
              {tier.badge && (
                <span
                  className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                    tier.id === "elite" ? "bg-crush text-black" : "bg-char-700 text-crush border border-crush/30"
                  }`}
                >
                  {tier.badge}
                </span>
              )}

              <div>
                <h3 className="font-display text-xl text-off uppercase mt-2 mb-1">{tier.name}</h3>
                <p className="text-xs text-off-dim line-clamp-2 min-h-[32px] mb-4">{tier.description}</p>

                <div className="bg-black/40 rounded-xl p-4 mb-4 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-off-dim">Franchise Fee:</span>
                    <span className="font-bold text-crush">{tier.franchiseFee}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-off-dim">Setup Cost:</span>
                    <span className="font-bold text-off">{tier.setupCost}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-off-dim">Space Required:</span>
                    <span className="font-semibold text-off-dim">{tier.spaceRequired}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-off-dim">Royalty / Mkt:</span>
                    <span className="font-medium text-crush-light/90">
                      {tier.royaltyFee} / {tier.marketingFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1 border-t border-white/10">
                    <span className="text-off-dim font-medium">Est. ROI:</span>
                    <span className="font-bold text-emerald-400">{tier.roi}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-xs text-off-dim">
                  {tier.features.map((feat, idx2) => (
                    <li key={idx2} className="flex items-start">
                      <svg className="w-4 h-4 text-crush shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(tier.id);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "bg-gradient-to-r from-crush to-crush-dark text-black shadow-lg shadow-crush/20"
                    : "bg-white/10 hover:bg-white/20 text-off"
                }`}
              >
                Apply For {tier.name}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
