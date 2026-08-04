import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DISCOVERY_STEPS, REQUIRED_LICENSES } from "../../data/franchise";

interface DiscoveryProcessProps {
  onOpenModal: () => void;
}

export const DiscoveryProcess: React.FC<DiscoveryProcessProps> = ({ onOpenModal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="discovery-process" className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-crush/10 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center mb-16"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">ONBOARDING ROADMAP</span>
        <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
          FRANCHISE DISCOVERY <span className="text-crush">PROCESS</span>
        </h2>
        <p className="mt-4 text-off-dim max-w-2xl mx-auto text-sm sm:text-base">
          From your initial RFC submission to grand opening day, our experienced corporate development
          team guides you through every step in 60-70 days.
        </p>
      </motion.div>

      {/* Interactive 8-Step Stepper Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {DISCOVERY_STEPS.map((stepItem, idx) => {
          const isActive = activeStep === stepItem.step;
          return (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveStep(stepItem.step)}
              className={`cursor-pointer rounded-[1.75rem] p-6 transition-all duration-300 border relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-char-800/95 via-char-900 to-black shadow-2xl ${
                isActive
                  ? "border-crush ring-2 ring-crush/40 shadow-[0_25px_60px_rgba(212,175,55,0.18)] -translate-y-1"
                  : "border-white/15 hover:border-crush/50 hover:-translate-y-1"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isActive ? "bg-crush text-black" : "bg-white/10 text-off-dim"
                  }`}
                >
                  {stepItem.subtitle}
                </span>
                <span className="text-3xl font-extrabold text-white/10 font-mono">0{stepItem.step}</span>
              </div>

              <div>
                <h3 className="font-display text-lg text-off uppercase mb-2">{stepItem.title}</h3>
                <p className="text-xs text-off-dim leading-relaxed">{stepItem.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-crush uppercase tracking-wider font-semibold">
                  {isActive ? "Active Selection" : "Click to view"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isActive ? "text-crush translate-x-1" : "text-off-dim/60"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Step Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-16 rounded-[1.75rem] border border-crush/25 bg-gradient-to-r from-crush/10 via-char-900 to-char-900 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <span className="font-display text-5xl text-crush/60 shrink-0">0{activeStep}</span>
          <div>
            <h4 className="font-display text-xl text-off uppercase">
              {DISCOVERY_STEPS.find((s) => s.step === activeStep)?.title}
            </h4>
            <p className="text-sm text-off-dim mt-1 max-w-2xl">
              {DISCOVERY_STEPS.find((s) => s.step === activeStep)?.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Licensing & Turnkey Support Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-br from-char-800 via-char-900 to-black rounded-[2rem] p-6 md:p-10 border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-crush/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <span className="text-crush text-xs font-bold uppercase tracking-wider">
              Compliance &amp; Regulatory Assistance
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-off mt-1 uppercase">
              Complete Licensing &amp; Turnkey Operational Setup
            </h3>
            <p className="text-sm text-off-dim mt-1 max-w-xl">
              BURGER NATION corporate assists franchisees in acquiring all necessary regulatory permits
              and operational licenses.
            </p>
          </div>

          <button
            onClick={onOpenModal}
            className="px-6 py-3.5 bg-gradient-to-r from-crush to-crush-dark hover:brightness-110 text-black font-bold rounded-xl text-sm transition-all duration-200 shrink-0 shadow-lg shadow-crush/20 active:scale-95"
          >
            Apply For Franchise Now
          </button>
        </div>

        {/* 5 Core Licenses */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          {REQUIRED_LICENSES.map((lic, idx) => (
            <motion.div
              key={lic.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/40 rounded-xl p-4 border border-white/5 text-center flex flex-col items-center justify-center space-y-2 hover:border-crush/30 transition-colors duration-300"
            >
              <span className="w-8 h-8 rounded-full bg-crush/10 text-crush flex items-center justify-center text-xs font-bold font-mono">
                {lic.id}
              </span>
              <span className="text-xs font-semibold text-off-dim">{lic.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
