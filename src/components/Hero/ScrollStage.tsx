import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 145;
const SCROLL_LENGTH_VH = 350;
const framePath = (n: number) => `/hero-frames/frame-${String(n).padStart(3, "0")}.jpg`;

const SMOKE_PUFFS = Array.from({ length: 18 }, (_, i) => {
  const angle = (360 / 18) * i + (Math.random() * 20 - 10);
  const distance = 90 + Math.random() * 130;
  return {
    id: i,
    x: Math.cos((angle * Math.PI) / 180) * distance,
    y: Math.sin((angle * Math.PI) / 180) * distance * 0.5 - 20,
    size: 50 + Math.random() * 100,
    delay: Math.random() * 0.1,
  };
});

export default function ScrollStage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [logoImpact, setLogoImpact] = useState(false);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Find the closest loaded frame if the exact index is not ready yet
    let img = framesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
        const prev = framesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = framesRef.current[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Universal 50% dead-center rendering for the burger subject across any screen resolution
    ctx.fillStyle = "#08090b";
    ctx.fillRect(0, 0, cw, ch);

    const scale = Math.max(ch / (ih * 0.95), cw / 2800);
    const dx = cw / 2 - 1764 * scale;
    const dy = ch * 0.64 - 900 * scale;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
  };

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadFrame = (idx: number) => {
      const img = new Image();
      img.src = framePath(idx + 1);
      img.onload = () => {
        if (cancelled) return;
        if (idx === 0 || currentFrameRef.current < 0) {
          currentFrameRef.current = 0;
          draw(0);
        }
      };
      imgs[idx] = img;
    };

    // Load first 15 frames immediately for instant responsiveness
    for (let i = 0; i < Math.min(15, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    // Load remaining frames asynchronously in background after initial page load
    const timer = setTimeout(() => {
      if (cancelled) return;
      for (let i = 15; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    }, 120);

    framesRef.current = imgs;

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = wrapperRef.current?.clientWidth || window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      if (currentFrameRef.current >= 0) draw(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          draw(frameIndex);
        }

        if (introRef.current) {
          const introOpacity = Math.max(0, 1 - progress * 7);
          introRef.current.style.opacity = String(introOpacity);
          introRef.current.style.transform = `translate3d(0, ${-progress * 160}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      aria-label="Burger Nation hero stage"
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden bg-char-900"
        animate={
          logoImpact
            ? { x: [0, -18, 16, -13, 10, -7, 4, -2, 0], y: [0, 9, -7, 6, -4, 3, -1, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Lightning Flash */}
        {logoImpact && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-40 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.1, 0.55, 0] }}
            transition={{ duration: 0.55, times: [0, 0.06, 0.16, 0.26, 0.6], ease: "easeOut" }}
          />
        )}

        {/* Centered Radiant Spotlight Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[75vh] w-[75%] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl z-10"
          style={{ background: "radial-gradient(circle, #ff5a00 0%, transparent 65%)" }}
        />

        {/* Floating Embers */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-crush animate-ping opacity-60" />
          <div className="absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 h-1 w-1 rounded-full bg-orange-300 animate-ping" />
        </div>

        {/* Hero Frame Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full object-center z-10" />

        {/* Hero Text Overlay — sits below the navbar, stacked above the burger art */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-x-0 top-0 pt-16 sm:pt-20 mx-auto z-30 flex flex-col items-center text-center px-4 max-w-xl w-full"
        >
          <div className="relative flex items-center justify-center">
            {logoImpact && (
              <>
                {/* Shockwave rings — double pulse for a thunderclap echo */}
                <motion.div
                  className="absolute rounded-full border-[3px] border-crush/60"
                  initial={{ width: 20, height: 20, opacity: 1 }}
                  animate={{ width: 480, height: 480, opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="absolute rounded-full border-2 border-crush-light/40"
                  initial={{ width: 20, height: 20, opacity: 0.9 }}
                  animate={{ width: 340, height: 340, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Impact flash */}
                <motion.div
                  className="absolute rounded-full bg-crush/50 blur-lg"
                  initial={{ width: 20, height: 20, opacity: 1 }}
                  animate={{ width: 200, height: 200, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Smoke / dust puffs */}
                {SMOKE_PUFFS.map((p) => (
                  <motion.span
                    key={p.id}
                    className="absolute rounded-full bg-white/20 blur-2xl"
                    style={{ width: p.size, height: p.size }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
                    animate={{ x: p.x, y: p.y, opacity: [0, 0.7, 0], scale: 1.4 }}
                    transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
            <motion.img
              src="/logo.png"
              alt="BURGER NATION"
              className="relative z-10 h-28 sm:h-36 md:h-48 w-auto object-contain drop-shadow-[0_15px_35px_rgba(212,175,55,0.6)]"
              initial={{ y: "-160vh", scale: 1.6, rotate: -14, opacity: 1 }}
              animate={{ y: 0, scale: [1.6, 0.72, 1.08, 1], rotate: 0, opacity: 1 }}
              transition={{ duration: 0.9, times: [0, 0.68, 0.85, 1], ease: [0.34, 1.56, 0.64, 1] }}
              onAnimationComplete={() => setLogoImpact(true)}
            />
          </div>

          <p className="mt-3 max-w-lg text-xs sm:text-base text-off-dim font-medium leading-relaxed px-2">
            100% Halal certified, hand-pressed Angus beef patties and crispy chicken fillets.
            Scroll to unbundle the layers.
          </p>

          <div className="pointer-events-auto mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
            <a
              href="#menu"
              className="rounded-full bg-crush px-8 py-3.5 text-xs tracking-[0.2em] font-bold text-black shadow-xl shadow-crush/30 hover:bg-orange-400 transition-all active:scale-95 text-center"
            >
              EXPLORE FULL MENU ↓
            </a>
            <a
              href="tel:01689637476"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs tracking-[0.18em] text-off font-semibold hover:border-crush hover:text-crush transition-colors text-center"
            >
              CALL: 01689 637476
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 animate-bounce opacity-80">
            <span className="text-[10px] tracking-[0.35em] text-off-dim font-mono">SCROLL TO UNPACK</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path
                d="M8 1v18M2 13l6 6 6-6"
                stroke="#FF5A00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-char-900 via-char-900/60 to-transparent z-30" />
      </motion.div>
    </div>
  );
}
