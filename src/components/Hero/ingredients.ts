export type Ingredient = {
  key: string;
  index: string;
  title: string;
  desc: string;
  side: "left" | "right";
  topPct: number;
};

export const INGREDIENTS: Ingredient[] = [
  { key: "topBun", index: "01", title: "Top Bun", desc: "Toasted Seeded Brioche", side: "left", topPct: 10 },
  { key: "pickles", index: "02", title: "Crispy Pickles", desc: "Sliced Gherkins, Sharp & Tangy", side: "right", topPct: 26 },
  { key: "cheese", index: "03", title: "Melted Cheese", desc: "American Cheese, Melted Fresh", side: "left", topPct: 41 },
  { key: "patty", index: "04", title: "Smashed Patty", desc: "Two 3oz Angus Beef Patties, Seared Fresh", side: "right", topPct: 56 },
  { key: "sauce", index: "05", title: "House Sauce", desc: "Our Signature Blend, Zero Compromise", side: "left", topPct: 71 },
  { key: "bottomBun", index: "06", title: "Bottom Bun", desc: "Toasted Seeded Brioche Base", side: "right", topPct: 86 },
];
