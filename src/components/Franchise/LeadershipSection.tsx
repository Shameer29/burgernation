import React from "react";
import { motion } from "framer-motion";
import { LEADERSHIP_PROFILES, type LeaderProfile } from "../../data/franchise";

const PILLARS = [
  {
    num: "01",
    title: "Teamwork Excellence",
    desc: "To become a leading franchisee in the QSR niche through effective teamwork, standardized systems, and operational harmony.",
    tag: "Pillar ONE — Foundation",
    highlight: false,
  },
  {
    num: "02",
    title: "World-Class Service",
    desc: "To be a world-class F&B and hospitality provider who makes our customers, employees, suppliers, shareholders, society, and environment smile.",
    tag: "Pillar TWO — Customer Smile",
    highlight: true,
  },
  {
    num: "03",
    title: "Admired Brand",
    desc: "To be a world-class company admired for the excellence that brings to both our customers and franchisee partners worldwide.",
    tag: "Pillar THREE — Brand Loyalty",
    highlight: false,
  },
];

const SkillBar: React.FC<{ name: string; percentage: number; delay: number }> = ({ name, percentage, delay }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] text-off-dim">
      <span>{name}</span>
      <span className="text-crush font-mono">{percentage}%</span>
    </div>
    <div className="w-full bg-char-700 h-1.5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-crush-dark to-crush h-full rounded-full"
      />
    </div>
  </div>
);

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="relative py-16 px-4 max-w-7xl mx-auto space-y-16 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/3 h-72 w-72 rounded-full bg-crush/10 blur-3xl" />

      {/* 3-Pillar Vision & Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-br from-char-800 via-char-900 to-black rounded-[2rem] p-6 md:p-12 border border-crush/20 shadow-2xl overflow-hidden"
      >
        <div className="absolute -top-10 right-0 w-80 h-80 bg-crush/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center mb-12">
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">CORE PHILOSOPHY</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            OUR <span className="text-crush">VISION &amp; VALUES</span>
          </h2>
          <p className="mt-4 text-off-dim max-w-2xl mx-auto text-sm sm:text-base italic">
            &ldquo;It is our belief that business &amp; values are inseparable. Values inspire trust...
            trust builds relationships... relationships drive growth.&rdquo;
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 rounded-[1.5rem] border flex flex-col justify-between transition-all duration-300 ${
                pillar.highlight
                  ? "bg-black/50 border-crush/50 ring-1 ring-crush/20"
                  : "bg-black/50 border-white/10 hover:border-crush/40"
              }`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg mb-4 ${
                    pillar.highlight
                      ? "bg-crush text-black"
                      : "bg-crush/10 border border-crush/30 text-crush"
                  }`}
                >
                  {pillar.num}
                </div>
                <h3 className="font-display text-xl text-off uppercase mb-2">{pillar.title}</h3>
                <p className="text-xs text-off-dim leading-relaxed">{pillar.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-semibold text-crush">
                {pillar.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leadership Profiles */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.35em] text-crush font-semibold">EXECUTIVE BOARD</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-off leading-[0.9]">
            BURGER NATION <span className="text-crush">LEADERSHIP</span>
          </h2>
          <p className="mt-4 text-off-dim max-w-2xl mx-auto text-sm sm:text-base">
            Helmed by seasoned hospitality leaders and entrepreneurs with decades of combined UK F&amp;B
            experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LEADERSHIP_PROFILES.map((leader: LeaderProfile, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-gradient-to-b from-char-800/95 via-char-900 to-black rounded-[1.75rem] p-8 border border-white/10 hover:border-crush/40 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 bg-crush/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                {/* Header Info */}
                <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-off tracking-tight">{leader.name}</h3>
                    <p className="text-crush font-semibold text-sm">{leader.title}</p>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-off-dim">
                      <span>{leader.email}</span>
                      {leader.phone && <span>{leader.phone}</span>}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-crush/10 border border-crush/30 flex items-center justify-center text-crush font-bold text-xl font-mono shrink-0">
                    {leader.name.charAt(0)}
                  </div>
                </div>

                {/* Key Stats Pill */}
                <div className="grid grid-cols-3 gap-3 mb-6 bg-black/40 p-4 rounded-xl border border-white/5">
                  {leader.stats.map((st, i) => (
                    <div key={i} className="text-center">
                      <span className="block text-lg font-bold text-crush">{st.value}</span>
                      <span className="text-[10px] text-off-dim font-medium uppercase tracking-wider">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bio paragraphs */}
                <div className="space-y-3 text-xs text-off-dim leading-relaxed mb-6">
                  {leader.bio.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Skills Progress Bars */}
              <div className="relative z-10 space-y-3 pt-4 border-t border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-off-dim block mb-2">
                  Leadership &amp; Operational Competencies
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {leader.skills.map((sk, sIdx) => (
                    <SkillBar key={sIdx} name={sk.name} percentage={sk.percentage} delay={sIdx * 0.08} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
