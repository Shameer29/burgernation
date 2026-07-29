import { useEffect, useRef, useState } from "react";
import IngredientLabel from "./IngredientLabel";
import { INGREDIENTS } from "./ingredients";

const TOTAL_FRAMES = 145;
const SCROLL_LENGTH_VH = 350;
const framePath = (n: number) => `/hero-frames/frame-${String(n).padStart(3, "0")}.jpg`;

export default function ScrollStage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

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
    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = img.onerror = () => {
        loaded++;
        if (cancelled) return;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setReady(true);
      };
      imgs[i] = img;
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
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
    if (!ready) return;
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

        const n = INGREDIENTS.length;
        labelRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = 0.1 + (i / n) * 0.55;
          const inEnd = start + 0.12;
          const holdEnd = 0.75;
          const fadeEnd = 0.88;
          let opacity = 0;
          if (progress >= start && progress < inEnd) {
            opacity = (progress - start) / (inEnd - start);
          } else if (progress >= inEnd && progress < holdEnd) {
            opacity = 1;
          } else if (progress >= holdEnd && progress < fadeEnd) {
            opacity = 1 - (progress - holdEnd) / (fadeEnd - holdEnd);
          }
          el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ready]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      aria-label="Burger Nation hero stage"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-char-900">
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

        {/* Loading Spinner */}
        {!ready && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-char-900">
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs tracking-[0.4em] text-crush font-bold">PREPARING HERITAGE STACK...</span>
              <div className="h-1 w-48 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-crush transition-[width] duration-200 shadow-md shadow-crush"
                  style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Text & Logo Header */}
        <div
          ref={introRef}
          className="pointer-events-none absolute top-[3%] sm:top-[4%] inset-x-0 mx-auto z-30 flex flex-col items-center text-center px-4 max-w-xl w-full"
        >
          <img
            src="/logo.png"
            alt="BURGER NATION"
            className="h-16 sm:h-24 md:h-28 w-auto object-contain my-1.5 drop-shadow-[0_8px_20px_rgba(212,175,55,0.45)] animate-float"
          />

          <p className="mt-4 max-w-lg text-sm sm:text-base text-off-dim font-medium leading-relaxed">
            100% Halal certified, hand-pressed Angus beef patties and crispy chicken fillets.
            Scroll to unbundle the layers.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="rounded-full bg-crush px-8 py-3.5 text-xs tracking-[0.2em] font-bold text-black shadow-xl shadow-crush/30 hover:bg-orange-400 transition-all active:scale-95"
            >
              EXPLORE FULL MENU ↓
            </a>
            <a
              href="tel:01689637476"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs tracking-[0.18em] text-off font-semibold hover:border-crush hover:text-crush transition-colors"
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

        {/* Symmetrical Ingredient Labels */}
        {INGREDIENTS.map((ing, i) => (
          <IngredientLabel key={ing.key} data={ing} ref={(el) => { labelRefs.current[i] = el; }} />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-char-900 via-char-900/60 to-transparent z-30" />
      </div>
    </div>
  );
}
