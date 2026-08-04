import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FRANCHISE_TIERS, type FranchiseTier } from "../../data/franchise";

interface InvestmentTiersProps {
  onOpenModal: (tierId?: string) => void;
}

export const InvestmentTiers: React.FC<InvestmentTiersProps> = ({ onOpenModal }) => {
  const [selectedTier, setSelectedTier] = useState<string>("high-street");
  const [calcSqFt, setCalcSqFt] = useState<number>(700);

  // Dynamic calculation helper based on selected Sq Ft
  const calculateEstimate = (sqFt: number) => {
    let tierName: string;
    let fee: number;
    let setup: number;
    let marketing: number;
    const royalty = 8;

    if (sqFt >= 1400) {
      tierName = "Elite Flagship";
      fee = 30000;
      setup = 140000;
      marketing = 4;
    } else if (sqFt >= 900) {
      tierName = "Premium QSR";
      fee = 30000;
      setup = 100000;
      marketing = 4;
    } else if (sqFt >= 500) {
      tierName = "High Street Prime";
      fee = 20000;
      setup = 80000;
      marketing = 3;
    } else {
      tierName = "Satellite Kiosk";
      fee = 15000;
      setup = 60000;
      marketing = 3;
    }

    return {
      tierName,
      fee,
      setup,
      total: fee + setup,
      royalty,
      marketing,
      paybackMonths: 24
    };
  };

  const calcResult = calculateEstimate(calcSqFt);

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

      {/* Interactive ROI & Investment Calculator Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-br from-char-800 via-char-900 to-black rounded-[2rem] p-6 md:p-10 border border-crush/30 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-crush/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-crush text-xs font-bold uppercase tracking-widest">Interactive Tool</span>
              <h3 className="font-display text-2xl md:text-3xl text-off mt-1 uppercase">
                Investment &amp; ROI Calculator
              </h3>
              <p className="text-sm text-off-dim mt-2">
                Slide your available store floor space to simulate financial setup costs, royalty rates,
                and expected ROI timeline.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-off-dim">Available Commercial Area:</span>
                <span className="text-crush text-lg font-bold bg-crush/10 px-3 py-1 rounded-lg border border-crush/20">
                  {calcSqFt} Sq. Ft.
                </span>
              </div>

              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={calcSqFt}
                onChange={(e) => setCalcSqFt(Number(e.target.value))}
                className="w-full h-3 bg-char-700 rounded-lg appearance-none cursor-pointer accent-crush"
              />

              <div className="flex justify-between text-xs text-off-dim/70 font-mono">
                <span>200 Sq Ft (Satellite)</span>
                <span>700 Sq Ft (High Street)</span>
                <span>1500+ Sq Ft (Elite)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-off-dim space-y-1">
              <p className="font-semibold text-off">Recommended Model for {calcSqFt} Sq.Ft:</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={calcResult.tierName}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                  className="text-crush font-bold text-sm"
                >
                  {calcResult.tierName}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Result Card */}
          <div className="lg:col-span-6 bg-char-900/90 rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
            <h4 className="text-lg font-bold text-off border-b border-white/10 pb-3 flex justify-between items-center">
              <span>Financial Projection Summary</span>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-normal">
                ROI: {calcResult.paybackMonths} Months
              </span>
            </h4>

            <AnimatePresence mode="wait">
              <motion.div
                key={calcResult.tierName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-off-dim block">Franchise Fee</span>
                  <span className="text-xl font-bold text-crush">£{calcResult.fee.toLocaleString()}</span>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-off-dim block">Est. Setup Cost</span>
                  <span className="text-xl font-bold text-off">£{calcResult.setup.toLocaleString()}</span>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-off-dim block">Royalty / Marketing</span>
                  <span className="text-lg font-bold text-off-dim">
                    {calcResult.royalty}% / {calcResult.marketing}%
                  </span>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-off-dim block">Total Est. Capital</span>
                  <span className="text-xl font-extrabold text-emerald-400">£{calcResult.total.toLocaleString()}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => onOpenModal()}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-crush to-crush-dark hover:brightness-110 text-black font-bold text-sm tracking-wide shadow-lg shadow-crush/20 transition-all duration-200 active:scale-95"
            >
              Start Franchise Application (RFC)
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
