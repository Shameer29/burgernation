export type MenuItem = {
  id: string;
  name: string;
  price?: string;
  note?: string;
  description?: string;
  spicy?: 1 | 2 | 3;
  veg?: boolean;
  image?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  priceLabel?: string;
  featured?: boolean;
  items: MenuItem[];
};

export type Sauce = {
  name: string;
  color: string;
  hot?: boolean;
  image: string;
  description: string;
};

export const SAUCES: Sauce[] = [
  { name: "OG Classic", color: "#EDE6D6", image: "/sauces/og-classic.png", description: "Creamy signature garlic ranch & herbs" },
  { name: "Buffalo Sauce", color: "#E8720C", image: "/sauces/buffalo-sauce.png", description: "Vibrant tangy cayenne pepper wing glaze" },
  { name: "Buldak", color: "#7A1010", hot: true, image: "/sauces/buldak.png", description: "Fiery Korean hot chili sauce with pepper seeds" },
  { name: "Korean Hot Honey", color: "#D98A1A", image: "/sauces/korean-hot-honey.png", description: "Sticky sweet honey glaze infused with chili warmth" },
  { name: "Bulls Eye BBQ", color: "#5B2E13", image: "/sauces/bulls-eye-bbq.png", description: "Rich smoky hickory barbecue with sesame seeds" },
  { name: "Nashville", color: "#C1281D", hot: true, image: "/sauces/nashville.png", description: "Cayenne pepper oil emulsion with intense Southern heat" },
  { name: "Mango & Habanero", color: "#F2A71B", hot: true, image: "/sauces/mango-habanero.png", description: "Tropical sweet mango balanced with fiery habanero spice" },
  { name: "Truffle Mayo", color: "#EDE0C8", image: "/sauces/truffle-mayo.png", description: "Gourmet creamy aioli infused with fine black truffle" },
  { name: "Chipotle", color: "#B4471E", image: "/sauces/chipotle.png", description: "Smoky orange-brown chipotle pepper mayonnaise" },
  { name: "Lemon & Herb", color: "#B7C93D", image: "/sauces/lemon-herb.png", description: "Zesty Mediterranean lemon juice and fragrant parsley herbs" },
  { name: "Parmesan", color: "#F0E6B8", image: "/sauces/parmesan.png", description: "Rich creamy garlic parmesan cheese blend with black pepper" },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "boss-iconics",
    label: "Boss Iconics",
    title: "Boss Iconics",
    subtitle: "BURGER NATION signature recipes crafted with premium seeded brioche, fresh ingredients, and custom house glazes.",
    featured: true,
    priceLabel: "Add Combo (Drinks & Fries) +£2.49",
    items: [
      { id: "cheeze-mutton-burger", name: "Cheeze Mutton Burger", price: "£6.49", description: "Juicy mutton patty, melted cheese, signature Boss sauce.", image: "/dishes/classic-plain-smash.png" },
      { id: "double-trouble", name: "Double Trouble", price: "£7.49", description: "Double patties, double cheese layer, caramelized onions.", image: "/dishes/gypsy-king.png" },
      { id: "chicken-delight", name: "Chicken Delight", price: "£6.99", description: "Crispy chicken fillet, crisp lettuce, creamy mayo.", image: "/dishes/classic-fillet.png" },
      { id: "chicken-club-max", name: "Chicken Club Max", price: "£6.49", description: "Triple layer chicken, smoky bacon strip, herb aioli.", image: "/dishes/bacon-stacker-smash.png" },
      { id: "chicken-fiery", name: "Chicken Fiery", price: "£6.49", spicy: 2, description: "Spicy cayenne battered chicken, jalapeños, fiery sauce.", image: "/dishes/inferno-fiery.png" },
      { id: "chicken-smokey-bbq", name: "Chicken Smokey BBQ", price: "£6.49", description: "Flame-grilled chicken, Bull's Eye BBQ glaze, gherkins.", image: "/dishes/bbq-smokey-smash.png" },
      { id: "chicken-grilled-burger", name: "Chicken Grilled Burger", price: "£6.49", description: "Tender grilled breast, garden tomatoes, herb mayo.", image: "/dishes/peri-peri-grill-burger.png" },
      { id: "fish-burger", name: "Fish Burger", price: "£6.49", description: "Crispy golden fish fillet, tartar sauce, lettuce.", image: "/dishes/jumbo-king-prawns.png" },
      { id: "chicken-strip-wrap", name: "Chicken Strip Wrap", price: "£6.49", spicy: 1, description: "Crispy tender strips in warm tortilla with fresh salad.", image: "/dishes/dynamite-dunk.png" },
      { id: "veggie-burger", name: "Veggie Burger", price: "£5.49", veg: true, description: "Garden vegetable patty, crisp lettuce, vegan mayo.", image: "/dishes/vegan-cheese-burger.png" },
      { id: "veggie-wrap", name: "Veggie Wrap", price: "£3.99", veg: true, description: "Grilled farm vegetables, house salsa, lettuce.", image: "/dishes/kids-chicken-wrap.png" },
      { id: "cheezy-paneer-burger", name: "Cheezy Paneer Burger", price: "£5.99", veg: true, description: "Crispy cottage cheese patty, melted cheddar, tikka glaze.", image: "/dishes/overdose.png" },
      { id: "veg-bun-kebab", name: "Veg Bun Kebab", price: "£5.99", veg: true, description: "Traditional spiced veg patty, onion rings, green chutney.", image: "/dishes/tmt.png" }
    ],
  },
  {
    id: "big-boss",
    label: "Big Boss",
    title: "Big Boss Premium Range",
    subtitle: "Heavyweight burgers loaded with double hand-pressed patties, artisan fillings & signature secret sauces.",
    items: [
      { id: "signature-burger", name: "Signature Burger", price: "£9.99", note: "FLAGSHIP", description: "Double Angus smash, brisket slice, melted double cheese, truffle aioli.", image: "/dishes/gypsy-king.png" },
      { id: "the-notorious", name: "The Notorious", price: "£9.99", spicy: 2, note: "HOT", description: "Quad smash patties, habanero drizzle, crispy onions.", image: "/dishes/overdose.png" },
      { id: "chicken-bhurji-burger", name: "Chicken Bhurji", price: "£9.49", spicy: 1, description: "Spiced shredded chicken, caramelized onions, melted cheese.", image: "/dishes/tmt.png" },
      { id: "cod-father", name: "Cod Father", price: "£7.99", description: "Atlantic cod fillet, dill tartar sauce, crispy slaw.", image: "/dishes/jumbo-king-prawns.png" },
      { id: "return-of-mac", name: "Return of Mac", price: "£9.49", description: "Double beef smash, Mac 'n' Cheese patty layer, BBQ drizzle.", image: "/dishes/wtf.png" },
      { id: "mac-a-veli", name: "Mac A Veli", price: "£8.99", spicy: 2, note: "HOT", description: "Fried spicy chicken, jalapeños, fiery cheese sauce.", image: "/dishes/big-daddy.png" },
      { id: "boss-hot-dog", name: "Boss Hot Dog", price: "£6.49", spicy: 1, note: "HOT", description: "Jumbo smoked sausage, crispy onions, mustard relish.", image: "/dishes/hot-dog-vegano.png" },
      { id: "smoky-salmon-burger", name: "Smoky Salmon Burger", price: "£9.99", note: "PREMIUM", description: "Grilled Atlantic salmon, lemon-herb dill mayo, brioche.", image: "/dishes/brisket-burger.png" }
    ],
  },
  {
    id: "boss-kids",
    label: "Boss Kids",
    title: "Boss Kids Nation",
    subtitle: "Delicious mini meals designed specially for kids, served with fries and fresh drinks.",
    items: [
      { id: "kids-chicken-cheeze-burger", name: "Kids Chicken Cheeze Burger", price: "£6.49", description: "Mild chicken patty, cheddar slice, soft brioche.", image: "/dishes/kids-cheese-burger.png" },
      { id: "kids-chicken-nuggets", name: "Kids Chicken Nuggets (3pcs)", price: "£2.99", description: "Crispy chicken breast bites with dip.", image: "/dishes/kids-chicken-nuggets.png" },
      { id: "kids-fish-fingers", name: "Kids Fish Fingers (3pcs)", price: "£2.99", description: "Golden fish sticks with tartar dip.", image: "/dishes/macaroni-cheese-bites.png" },
      { id: "kids-veggie-burger", name: "Kids Veggie Burger", price: "£4.49", veg: true, description: "Mild vegetable patty with tomato ketchup.", image: "/dishes/kids-chicken-burger.png" }
    ],
  },
  {
    id: "boss-snacks",
    label: "Boss Snacks & Sides",
    title: "Boss Snacks & Sides",
    subtitle: "Golden crispy sides, loaded fries, tenders, and quick bites.",
    items: [
      { id: "chicken-popcorn", name: "Chicken Popcorn", price: "£3.99", note: "10 PCS", description: "Bite-sized seasoned chicken popcorn.", image: "/dishes/chicken-popcorn.png" },
      { id: "chicken-nuggets", name: "Chicken Nuggets", price: "£3.99", note: "6 PCS", description: "Classic crispy chicken nuggets.", image: "/dishes/crispy-chicken-chunks.png" },
      { id: "jalapeno-cheeze-poppers", name: "Jalapeno Cheeze Poppers", price: "£3.49", spicy: 1, veg: true, description: "Molten cheese & jalapeño bites.", image: "/dishes/macaroni-cheese-bites.png" },
      { id: "cheeze-veg-sticks", name: "Cheeze Veg Sticks", price: "£3.49", veg: true, description: "Crispy breaded vegetable cheese sticks.", image: "/dishes/mozzarella-sticks.png" },
      { id: "onion-rings", name: "Onion Rings", price: "£3.49", veg: true, description: "Beer-battered golden onion rings.", image: "/dishes/onion-rings.png" },
      { id: "boss-smiley", name: "Boss Smiley", price: "£4.49", veg: true, description: "Crispy potato smileys.", image: "/dishes/diced-potatoes.png" },
      { id: "british-hot-wings", name: "British Hot Wings", price: "£6.49", spicy: 2, description: "Spicy cayenne glazed fried chicken wings.", image: "/dishes/buffalo-wings.png" },
      { id: "british-fried-chicken", name: "British Fried Chicken", price: "£8.49", description: "3 pcs classic Southern fried chicken pieces.", image: "/dishes/chicken-tenders.png" },
      { id: "mutton-loaded-fries", name: "Mutton Loaded Fries", price: "£6.99", spicy: 1, description: "Fries topped with slow-cooked mutton, cheese sauce & jalapeños.", image: "/dishes/cheesy-chips.png" },
      { id: "chicken-loaded-fries", name: "Chicken Loaded Fries", price: "£6.49", spicy: 1, description: "Fries loaded with shredded chicken, house sauce & herbs.", image: "/dishes/peri-peri-chips.png" },
      { id: "fish-fingers-6pc", name: "Fish Fingers (6pcs)", price: "£4.99", description: "Panko breaded cod fingers with tartar sauce.", image: "/dishes/halloumi-fries.png" },
      { id: "french-fries-small", name: "French Fries (Small)", price: "£2.49", veg: true, description: "Crispy salted potato fries.", image: "/dishes/plain-chips.png" },
      { id: "french-fries-large", name: "French Fries (Large)", price: "£3.49", veg: true, description: "Large portion crispy potato fries.", image: "/dishes/sweet-potato-fries.png" }
    ],
  },
  {
    id: "boss-desserts",
    label: "Boss Desserts",
    title: "Boss Desserts",
    subtitle: "Decadent dessert jars, brownies, warm cookies, and premium ice cream scoops.",
    items: [
      { id: "boss-jar-red-velvet", name: "Boss Jar – Red Velvet", price: "£6.49", description: "Layers of red velvet sponge & cream cheese frosting.", image: "/dishes/cake.png" },
      { id: "boss-jar-chocolate-mud", name: "Boss Jar – Chocolate Mud", price: "£6.49", description: "Rich chocolate fudge cake with ganache.", image: "/dishes/belgian-waffle.png" },
      { id: "boss-jar-tiramisu", name: "Boss Jar – Tiramisu", price: "£6.49", description: "Italian espresso infused sponge with mascarpone cream.", image: "/dishes/cake.png" },
      { id: "boss-cookie", name: "Boss Cookie", price: "£3.79", description: "Freshly baked gooey chocolate chip cookie.", image: "/dishes/belgian-waffle.png" },
      { id: "boss-brownie", name: "Boss Brownie", price: "£3.49", description: "Fudgy Belgian chocolate brownie.", image: "/dishes/cake.png" },
      { id: "brownie-icecream", name: "Brownie with Ice-cream", price: "£3.99", description: "Warm brownie served with vanilla scoop & hot fudge.", image: "/dishes/belgian-waffle.png" },
      { id: "boss-scoops-single", name: "Boss Scoops (Single)", price: "£2.49", description: "Vanilla, Belgian Chocolate, Salted Caramel, Lotus Biscoff, Vegan Dark Choco.", image: "/dishes/milkshake.png" },
      { id: "boss-scoops-double", name: "Boss Scoops (Double)", price: "£4.99", description: "Two scoops of your favorite artisanal ice cream.", image: "/dishes/milkshake.png" },
      { id: "boss-scoops-triple", name: "Boss Scoops (Triple)", price: "£6.49", description: "Three scoops sundae with chocolate drizzle & nuts.", image: "/dishes/milkshake.png" }
    ],
  },
  {
    id: "boss-shakes",
    label: "Boss Shakes & Drinks",
    title: "Boss Shakes & Refreshing Drinks",
    subtitle: "Thick handcrafted gourmet shakes topped with whipped cream and refreshing cold beverages.",
    items: [
      { id: "boss-cold-coffee", name: "Boss Cold Coffee", price: "£3.49", description: "Rich brewed espresso blended with ice cream and cocoa.", image: "/dishes/milkshake.png" },
      { id: "oreo-shake", name: "Oreo Shake", price: "£3.99", description: "Crushed Oreo cookies, vanilla ice cream, chocolate drizzle.", image: "/dishes/milkshake.png" },
      { id: "peanut-butter-shake", name: "Peanut Butter Shake", price: "£3.99", description: "Creamy peanut butter blend with caramel swirl.", image: "/dishes/milkshake.png" },
      { id: "strawberry-shake", name: "Strawberry Shake", price: "£3.99", description: "Real strawberry puree blended with fresh milk.", image: "/dishes/milkshake.png" },
      { id: "vanilla-shake", name: "Vanilla Shake", price: "£3.99", description: "Madagascar vanilla bean milkshake.", image: "/dishes/milkshake.png" },
      { id: "chocolate-shake", name: "Chocolate Shake", price: "£3.99", description: "Rich Belgian chocolate fudge milkshake.", image: "/dishes/milkshake.png" },
      { id: "caramel-shake", name: "Caramel Shake", price: "£3.99", description: "Salted caramel drizzle with creamy vanilla base.", image: "/dishes/milkshake.png" },
      { id: "soft-drinks-250ml", name: "Soft Drinks (250ml)", price: "£1.50", description: "Coca-Cola, Sprite, Fanta, Ribena, Diet Coke.", image: "/dishes/tango-ice-blast.png" },
      { id: "water-bottle-500ml", name: "Mineral Water (500ml)", price: "£1.00", description: "Chilled pure drinking water.", image: "/dishes/tango-ice-blast.png" }
    ],
  }
];
