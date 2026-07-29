import { BottomBun, Cheese, Patty, Pickles, Sauce, TopBun } from "../Hero/BurgerLayers";

/** Static assembled burger stack used inside menu cards; the parent
 * handles the continuous 360 hover-spin via a 3D-perspective wrapper. */
export default function MiniBurger({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ width: "100%" }}>
      <TopBun className="w-full -mb-2 drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]" />
      <Pickles className="w-[86%] -mb-2" />
      <Cheese className="w-[92%] -mb-3" />
      <Patty className="w-[90%] -mb-2" />
      <Sauce className="w-[80%] -mb-1" />
      <BottomBun className="w-full" />
    </div>
  );
}
