import { forwardRef } from "react";

/**
 * Photoreal ingredient cutouts (generated + background-removed via Higgsfield,
 * served from public/burger). Each forwardRef<HTMLImageElement> so GSAP/Framer
 * can grab the DOM node directly for transform-only animation (translate/scale
 * — no layout thrash), same contract the old inline-SVG layers exposed.
 */

type LayerProps = { className?: string };

function makeLayer(src: string, alt: string) {
  return forwardRef<HTMLImageElement, LayerProps>(function Layer({ className }, ref) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        draggable={false}
        className={className}
        style={{ willChange: "transform", filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.45))" }}
      />
    );
  });
}

export const TopBun = makeLayer("/burger/top-bun.png", "");
export const Pickles = makeLayer("/burger/pickles.png", "");
export const Cheese = makeLayer("/burger/cheese.png", "");
export const Patty = makeLayer("/burger/patty.png", "");
export const Sauce = makeLayer("/burger/sauce.png", "");
export const BottomBun = makeLayer("/burger/bottom-bun.png", "");

export const LAYER_ORDER = ["topBun", "pickles", "cheese", "patty", "sauce", "bottomBun"] as const;
export type LayerKey = (typeof LAYER_ORDER)[number];
