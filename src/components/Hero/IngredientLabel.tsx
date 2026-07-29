import { forwardRef } from "react";
import type { Ingredient } from "./ingredients";

const IngredientLabel = forwardRef<HTMLDivElement, { data: Ingredient }>(
  function IngredientLabel({ data }, ref) {
    const isLeft = data.side === "left";
    return (
      <div
        ref={ref}
        className={`absolute z-40 w-[75vw] max-w-[340px] sm:w-[40vw] md:w-[320px] rounded-2xl border border-white/10 bg-char-800/80 p-4 sm:p-5 backdrop-blur-md shadow-2xl transition-all duration-300 ${
          isLeft
            ? "left-[4%] sm:left-[6%] md:left-[8%] text-left border-l-2 border-l-crush"
            : "right-[4%] sm:right-[6%] md:right-[8%] text-right border-r-2 border-r-crush"
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
