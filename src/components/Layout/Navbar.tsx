import { useEffect, useState } from "react";

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 transition-colors duration-300 ${
        solid ? "bg-char-900/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <a href="#top" className="flex items-center gap-3 group">
        <img
          src="/logo.png"
          alt="BURGER NATION"
          className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
        />
      </a>
      <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] text-off-dim">
        <a href="#menu" className="hover:text-crush transition-colors">MENU</a>
        <a href="#story" className="hover:text-crush transition-colors">STORY</a>
        <a href="#locations" className="hover:text-crush transition-colors">VISIT</a>
        <a href="tel:01689637476" className="hover:text-crush transition-colors">01689 637476</a>
      </nav>
      <a
        href="#menu"
        className="rounded-full border border-crush/60 px-4 py-2 text-[11px] sm:text-xs tracking-[0.15em] text-off hover:bg-crush hover:border-crush transition-colors"
      >
        ORDER
      </a>
    </header>
  );
}
