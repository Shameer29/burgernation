import { useEffect, useState } from "react";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 ${
          solid || mobileMenuOpen ? "bg-char-900/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
          <img
            src="/logo.png"
            alt="BURGER NATION"
            className="h-9 sm:h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] text-off-dim font-medium">
          <a href="#menu" className="hover:text-crush transition-colors">MENU</a>
          <a href="#story" className="hover:text-crush transition-colors">STORY</a>
          <a href="#locations" className="hover:text-crush transition-colors">VISIT</a>
          <a href="tel:01689637476" className="hover:text-crush transition-colors text-white font-semibold">01689 637476</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="rounded-full bg-crush/10 border border-crush/70 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs tracking-[0.15em] font-bold text-crush hover:bg-crush hover:text-black transition-all shadow-sm"
          >
            ORDER
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/5 text-off hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 my-0.5 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Luxury Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-char-900/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-between px-6 pt-24 pb-10 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-6 text-center mt-6">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-2xl sm:text-3xl tracking-[0.2em] font-bold text-off hover:text-crush transition-colors py-2 border-b border-white/10"
          >
            MENU
          </a>
          <a
            href="#sauces"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-2xl sm:text-3xl tracking-[0.2em] font-bold text-off hover:text-crush transition-colors py-2 border-b border-white/10"
          >
            SAUCE SHOWCASE
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-2xl sm:text-3xl tracking-[0.2em] font-bold text-off hover:text-crush transition-colors py-2 border-b border-white/10"
          >
            OUR STORY
          </a>
          <a
            href="#locations"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-2xl sm:text-3xl tracking-[0.2em] font-bold text-off hover:text-crush transition-colors py-2 border-b border-white/10"
          >
            VISIT & LOCATIONS
          </a>
        </nav>

        <div className="flex flex-col gap-4 mt-auto pt-8">
          <a
            href="tel:01689637476"
            className="w-full rounded-2xl border border-white/20 bg-white/5 py-4 text-center text-sm font-semibold tracking-widest text-off hover:border-crush hover:text-crush transition-all"
          >
            CALL: 01689 637476
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full rounded-2xl bg-crush py-4 text-center text-sm font-bold tracking-widest text-black shadow-lg shadow-crush/30 hover:bg-orange-400 transition-all"
          >
            EXPLORE & ORDER NOW
          </a>
        </div>
      </div>
    </>
  );
}

