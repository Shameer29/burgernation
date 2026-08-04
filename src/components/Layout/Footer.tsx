import { motion } from "framer-motion";

interface FooterProps {
  onSelectTab: (tabId: string) => void;
  onOpenModal: () => void;
}

const NAV_LINKS = [
  { id: "home", label: "Home & Story" },
  { id: "menu", label: "Full Menu" },
  { id: "franchise-tiers", label: "Franchise Models" },
  { id: "reviews-social", label: "Reviews & Social Proof" },
  { id: "faq", label: "Franchise FAQ" },
];

export default function Footer({ onSelectTab, onOpenModal }: FooterProps) {
  return (
    <footer className="relative bg-char-950 border-t border-white/10 overflow-hidden">
      {/* Marquee Header */}
      <div className="scrollbar-none overflow-hidden py-4 bg-black/60 border-b border-white/5">
        <div className="flex w-max animate-marquee gap-8 text-crush/20 font-extrabold text-3xl md:text-5xl uppercase tracking-widest font-mono">
          <span>BURGER NATION &middot; BE YOUR OWN BOSS &middot; SERIOUSLY FUN &middot; SMASHED FRESH &middot;</span>
          <span>BURGER NATION &middot; BE YOUR OWN BOSS &middot; SERIOUSLY FUN &middot; SMASHED FRESH &middot;</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
        {/* Brand Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 md:col-span-1"
        >
          <img
            src="/logo.png"
            alt="BURGER NATION"
            className="h-10 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
          />
          <p className="text-off-dim leading-relaxed">
            A QSR concept committed to serving the best-tasting burger experience in a fun, comfortable
            environment with low setup costs and high ROI.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
            100% HALAL CERTIFIED &amp; PREMIUM ANGUS
          </span>
        </motion.div>

        {/* Quick Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <h5 className="text-xs font-bold tracking-widest text-crush uppercase mb-4">Navigate Sections</h5>
          <ul className="space-y-2.5 text-off-dim">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onSelectTab(link.id)}
                  className="hover:text-crush hover:translate-x-0.5 transition-all duration-200 inline-block"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Corporate Franchise Contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <h5 className="text-xs font-bold tracking-widest text-crush uppercase mb-4">Franchise Inquiries</h5>
          <ul className="space-y-2.5 text-off-dim">
            <li className="font-semibold text-off">Corporate Head Office:</li>
            <li className="text-crush-light">Azeem (CEO &amp; Founder)</li>
            <li>corporate@burgernation.co.uk / azeem@burgernation.co.uk</li>
            <li className="pt-2 font-semibold text-off">Franchise Development:</li>
            <li className="text-crush-light">Guru Shankar (Managing Director)</li>
            <li>guru@burgernation.co.uk</li>
            <li>+44 20 3839 1122</li>
          </ul>
        </motion.div>

        {/* Apply CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-b from-char-800/95 via-char-900 to-black p-6 rounded-[1.75rem] border border-crush/30 flex flex-col justify-between space-y-4 overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-crush/10 blur-3xl" />
          <div className="relative">
            <h5 className="font-display text-sm text-off mb-1 uppercase tracking-wide">Own A Burger Nation</h5>
            <p className="text-off-dim text-xs">
              Be your own boss with 24-month ROI and complete turnkey setup support.
            </p>
          </div>
          <button
            onClick={onOpenModal}
            className="relative w-full py-3 rounded-xl bg-gradient-to-r from-crush to-crush-dark hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-crush/20 active:scale-95"
          >
            Apply For Franchise
          </button>
        </motion.div>
      </div>

      <div className="border-t border-white/5 py-6 px-6 text-center text-xs text-off-dim/60">
        &copy; {new Date().getFullYear()} BURGER NATION. All Rights Reserved.
      </div>
    </footer>
  );
}
