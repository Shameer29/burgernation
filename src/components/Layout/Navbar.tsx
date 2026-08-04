import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenFranchiseModal: () => void;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "franchise-tiers", label: "Franchise Models" },
  { id: "reviews-social", label: "Reviews" },
  { id: "faq", label: "FAQ" }
];

export default function Navbar({ activeTab, setActiveTab, onOpenFranchiseModal }: NavbarProps) {
  const [solid, setSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 transition-colors duration-300 ${
          solid || mobileMenuOpen
            ? "bg-char-900/95 backdrop-blur-xl border-b border-crush/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-char-900/90 to-char-900/40 backdrop-blur-md border-b border-white/5"
        }`}
      >
        {/* Brand Logo */}
        <button onClick={() => handleTabClick("home")} className="flex items-center gap-3 group text-left shrink-0">
          <img
            src="/logo.png"
            alt="BURGER NATION"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Desktop Navigation — editorial underline style, no pill container */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.18em] uppercase">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative py-2 transition-colors duration-200 whitespace-nowrap ${
                  isActive ? "text-crush" : "text-off-dim hover:text-off"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-crush rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenFranchiseModal}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-crush to-crush-dark hover:brightness-110 text-black font-bold text-[10px] sm:text-xs tracking-wider transition-all shadow-md shadow-crush/20 active:scale-95"
          >
            BE YOUR OWN BOSS
          </button>

          <button
            onClick={() => handleTabClick("menu")}
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-crush/10 border border-crush/70 text-crush font-bold text-xs hover:bg-crush hover:text-black transition-all active:scale-95"
          >
            ORDER ONLINE
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-9 h-9 rounded-xl border border-white/15 bg-white/5 text-off hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 my-0.5 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer — editorial numbered list */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-char-900/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-6 pt-24 pb-8"
          >
            <nav className="flex flex-col overflow-y-auto max-h-[65vh]">
              {navItems.map((item, i) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleTabClick(item.id)}
                    className="w-full text-left py-4 border-b border-white/10 flex items-center justify-between group"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className={`font-display text-xs ${isActive ? "text-crush" : "text-off-dim/50"}`}>
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-2xl tracking-wide ${
                          isActive ? "text-crush" : "text-off group-hover:text-crush/80"
                        } transition-colors`}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span className={`text-lg transition-transform ${isActive ? "text-crush translate-x-0" : "text-off-dim/40 -translate-x-1 group-hover:translate-x-0"}`}>
                      &rarr;
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFranchiseModal();
                }}
                className="w-full rounded-2xl bg-gradient-to-r from-crush to-crush-dark py-4 text-center text-sm font-bold tracking-wider text-black shadow-lg shadow-crush/20 active:scale-95 transition-transform"
              >
                OWN A BURGER NATION FRANCHISE
              </button>

              <button
                onClick={() => handleTabClick("menu")}
                className="w-full rounded-2xl border border-white/20 bg-white/5 py-3 text-center text-sm font-semibold tracking-wider text-white active:scale-95 transition-transform"
              >
                VIEW FULL MENU & ORDER
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
