export default function Footer() {
  return (
    <footer id="locations" className="relative bg-char-950 border-t border-white/5 overflow-hidden">
      <div className="scrollbar-none overflow-hidden py-6 border-b border-white/5">
        <div className="flex w-max animate-marquee gap-8 text-off/10">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex shrink-0 gap-8 pr-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="font-display text-6xl sm:text-8xl whitespace-nowrap text-off/[0.06]">
                  BURGER NATION &middot;
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div id="story" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <img
            src="/logo.png"
            alt="BURGER NATION"
            className="h-12 sm:h-14 w-auto object-contain mb-3 drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]"
          />
          <p className="text-sm text-off-dim leading-relaxed max-w-xs">
            Smashed fresh, stacked bold. No shortcuts, no filler &mdash; just
            Angus beef and a sauce we'll never give up.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-crush/40 px-3 py-1.5 text-[10px] tracking-[0.2em] text-crush">
            HALAL CERTIFIED
          </span>
        </div>
        <div>
          <h5 className="text-xs tracking-[0.3em] text-crush mb-4">VISIT</h5>
          <ul className="space-y-2 text-sm text-off-dim">
            <li>261 High Street, Orpington, BR6 0NW</li>
            <li>
              <a href="tel:01689637476" className="hover:text-off transition-colors">01689 637476</a>
            </li>
          </ul>
          <h5 className="text-xs tracking-[0.3em] text-crush mt-6 mb-4">ORDER DELIVERY</h5>
          <ul className="space-y-2 text-sm text-off-dim">
            <li className="hover:text-off transition-colors cursor-pointer">Just Eat</li>
            <li className="hover:text-off transition-colors cursor-pointer">Deliveroo</li>
            <li className="hover:text-off transition-colors cursor-pointer">Uber Eats</li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs tracking-[0.3em] text-crush mb-4">FOLLOW</h5>
          <ul className="space-y-2 text-sm text-off-dim">
            <li className="hover:text-off transition-colors cursor-pointer">Instagram</li>
            <li className="hover:text-off transition-colors cursor-pointer">TikTok</li>
            <li className="hover:text-off transition-colors cursor-pointer">X</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 px-5 sm:px-8 text-center text-[11px] tracking-widest text-off-dim/60">
        &copy; {new Date().getFullYear()} BURGER NATION. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
