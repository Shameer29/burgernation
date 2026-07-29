import { forwardRef } from "react";
import type { Ingredient } from "./ingredients";

const IngredientLabel = forwardRef<HTMLDivElement, { data: Ingredient }>(
  function IngredientLabel({ data }, ref) {
    const isLeft = data.side === "left";
    return (
      <div
        ref={ref}
        className={`absolute z-40 w-[86vw] max-w-[320px] sm:w-[50vw] md:w-[320px] rounded-2xl border border-white/15 bg-char-800/85 p-4 sm:p-5 backdrop-blur-md shadow-2xl transition-all duration-300 left-1/2 -translate-x-1/2 md:translate-x-0 ${
          isLeft
            ? "md:left-[8%] md:right-auto text-left border-l-2 border-l-crush"
            : "md:right-[8%] md:left-auto text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-l-crush md:border-r-crush"
        }`}
        style={{
          top: `${data.topPct}%`,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        <div className={`flex items-center gap-2.5 ${isLeft ? "" : "flex-row-reverse"}`}>
          <span className="rounded-full bg-crush/15 px-2.5 py-0.5 font-display text-crush text-xs tracking-widest font-bold border border-crush/30">
            {data.index}
          </span>
          <span className={`h-px flex-1 ${isLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-crush/80 to-transparent`} />
        </div>
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl leading-none text-off mt-2.5 font-bold">
          {data.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-off-dim leading-relaxed font-normal">
          {data.desc}
        </p>
      </div>
    );
  }
);

export default IngredientLabel;
