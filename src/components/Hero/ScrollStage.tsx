import { useEffect, useRef } from "react";
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
  }, []);

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

        {/* Hero Text Overlay — sits below the navbar, stacked above the burger art */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-x-0 top-0 pt-16 sm:pt-20 mx-auto z-30 flex flex-col items-center text-center px-4 max-w-xl w-full"
        >
          <img
            src="/logo.png"
            alt="BURGER NATION"
            className="h-14 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_8px_20px_rgba(212,175,55,0.45)]"
          />

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

        {/* Symmetrical Ingredient Labels */}
        {INGREDIENTS.map((ing, i) => (
          <IngredientLabel key={ing.key} data={ing} ref={(el) => { labelRefs.current[i] = el; }} />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-char-900 via-char-900/60 to-transparent z-30" />
      </div>
    </div>
  );
}
