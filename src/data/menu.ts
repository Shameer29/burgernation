export type MenuItem = {
  id: string;
  name: string;
  price?: string;
  note?: string;
  description?: string;
  spicy?: 1 | 2 | 3;
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
    id: "smash",
    label: "Smash Burgers",
    title: "Smash Burgers",
    subtitle:
      "Two 3oz smashed Angus beef patties, seeded brioche bun, lettuce, mayo, gherkins, American cheese & house sauce.",
    featured: true,
    items: [
      { id: "classic-plain-smash", name: "Classic Plain Smash", price: "£8.99", image: "/dishes/classic-plain-smash.png" },
      { id: "truffle-smash", name: "Truffle Smash", price: "£8.99", description: "Fried onions, truffle sauce.", image: "/dishes/truffle-smash.png" },
      { id: "bacon-stacker-smash", name: "Bacon Stacker Smash", price: "£8.99", description: "Beef bacon, house sauce.", image: "/dishes/bacon-stacker-smash.png" },
      { id: "mexican-drizzle-smash", name: "Mexican Drizzle Smash", price: "£8.99", description: "Gherkins, jalapeños, mild salsa.", spicy: 1, image: "/dishes/mexican-drizzle-smash.png" },
      { id: "bbq-smokey-smash", name: "BBQ Smokey Smash", price: "£8.99", description: "Gherkins, BBQ sauce.", image: "/dishes/bbq-smokey-smash.png" },
      { id: "gypsy-king", name: "The Gypsy King", price: "£10.99", note: "PREMIUM", description: "Fried & caramelised onions, mayo, gherkins, house sauce.", image: "/dishes/gypsy-king.png" },
      { id: "tmt", name: "T·M·T — The Meat Talk", price: "£10.99", note: "PREMIUM", description: "Lamb doner, caramelised onions, gherkins, house sauce.", image: "/dishes/tmt.png" },
      { id: "incredible-hulk", name: "Incredible Hulk", price: "£10.99", note: "PREMIUM", description: "Grilled chicken fillet, house sauce, gherkins.", image: "/dishes/incredible-hulk.png" },
      { id: "overdose", name: "O·V·E·R·D·O·S·E", price: "£10.99", note: "PREMIUM", description: "Double American cheese, fried onion, gherkins.", image: "/dishes/overdose.png" },
    ],
  },
  {
    id: "classic-beef",
    label: "Beef Burgers",
    title: "Classic Gourmet Beef Burgers",
    subtitle: "6oz, toasted brioche bun, lettuce, tomato & red onion. Served with chips and a 330ml drink.",
    priceLabel: "£11.99",
    items: [
      { id: "original-plain-cheese", name: "Original Plain Cheese Burger", image: "/dishes/original-plain-cheese.png" },
      { id: "new-yorker", name: "New Yorker", description: "Lettuce, mustard, burger relish.", image: "/dishes/new-yorker.png" },
      { id: "bacon-stack", name: "Bacon Stack", description: "Beef bacon, house sauce.", image: "/dishes/bacon-stack.png" },
      { id: "inferno-fiery", name: "Inferno Fiery", description: "Hot cheese sauce.", spicy: 2, image: "/dishes/inferno-fiery.png" },
      { id: "bulls-eye-bbq-burger", name: "Bull's Eye BBQ", description: "Smoky BBQ sauce.", image: "/dishes/bulls-eye-bbq-burger.png" },
    ],
  },
  {
    id: "double-patty",
    label: "Double Patty",
    title: "Premium Double Patty Burgers",
    subtitle: "12oz, two hand-pressed patties in a toasted brioche bun. Served with chips and a 330ml drink.",
    priceLabel: "£13.99",
    items: [
      { id: "wtf", name: "WTF (Where's The Food)", description: "Grilled beef sausage, fried onions, Bull's Eye BBQ, relish, sweet chilli.", image: "/dishes/wtf.png" },
      { id: "big-mama", name: "Big Mama", description: "Southern fried chicken fillet, BBQ sauce, relish, sweet chilli.", image: "/dishes/big-mama.png" },
      { id: "big-daddy", name: "Big Daddy", description: "Fried gherkins, jalapeños, mustard sauce, relish, sweet chilli.", spicy: 1, image: "/dishes/big-daddy.png" },
      { id: "brisket-burger", name: "Brisket Burger", description: "Sliced smoked brisket, BBQ sauce, fried onions.", image: "/dishes/brisket-burger.png" },
    ],
  },
  {
    id: "chicken-burgers",
    label: "Chicken Burgers",
    title: "Chicken Burgers",
    subtitle: "Crispy chicken fillet, toasted brioche bun, lettuce & American cheese. Served with chips and a 330ml drink.",
    items: [
      { id: "classic-fillet", name: "The Classic Fillet Burger", price: "£9.99", description: "Mayo, fresh lettuce.", image: "/dishes/classic-fillet.png" },
      { id: "cheesy-zinger-stacker", name: "Cheesy Zinger Stacker", price: "£9.99", description: "Hash brown, nacho cheese sauce, salsa.", image: "/dishes/cheesy-zinger-stacker.png" },
      { id: "chicken-parmeshan", name: "Chicken Parmeshan", price: "£9.99", description: "Parmesan sauce, lettuce, red onions.", image: "/dishes/chicken-parmeshan.png" },
      { id: "nashville-burger", name: "Nashville", price: "£9.99", description: "Nashville spice, creamy coleslaw, pickles.", spicy: 2, image: "/dishes/nashville-burger.png" },
      { id: "buldak-burger", name: "Buldak", price: "£9.99", note: "VERY HOT", description: "Lettuce, fried onion, Buldak sauce.", spicy: 3, image: "/dishes/buldak-burger.png" },
      { id: "korean-hot-honey-burger", name: "Korean Hot Honey", price: "£9.99", description: "Red onions, jalapeños, Korean hot honey.", spicy: 1, image: "/dishes/korean-hot-honey-burger.png" },
      { id: "dynamite-dunk", name: "Dynamite Dunk", price: "£9.99", description: "House sauce, lettuce, red onions, gherkins.", image: "/dishes/dynamite-dunk.png" },
      { id: "peri-peri-grill-burger", name: "Peri-Peri Grill Burger", price: "£10.99", description: "Flame-grilled, melted cheese, peri-peri sauce.", spicy: 1, image: "/dishes/peri-peri-grill-burger.png" },
      { id: "mango-habanero-burger", name: "Mango & Habanero Grill Burger", price: "£10.99", description: "Flame-grilled, melted cheese, mango habanero sauce.", spicy: 1, image: "/dishes/mango-habanero-burger.png" },
      { id: "chick-a-boo", name: "Chick-A-Boo", price: "£10.99", description: "Fried & grilled chicken fillet, house sauce.", image: "/dishes/chick-a-boo.png" },
      { id: "chick-n-doner", name: "Chick 'N' Doner", price: "£10.99", description: "Crispy chicken fillet, lamb doner, house sauce.", image: "/dishes/chick-n-doner.png" },
    ],
  },
  {
    id: "peri-peri",
    label: "Peri-Peri Grill",
    title: "Peri-Peri Grill",
    subtitle: "Marinated overnight in our signature homemade sauce and flame-grilled to perfection. Choose your sauce — no extra charge.",
    items: [
      { id: "peri-peri-chicken", name: "Peri-Peri Grilled Chicken", note: "HALF £11.99 · FULL £16.99", description: "Chicken on the bone, flame-grilled to order.", spicy: 1, image: "/dishes/peri-peri-chicken.png" },
      { id: "peri-peri-wings", name: "Peri-Peri Grilled Wings", note: "6PC £6.99 · 12PC £11.99 · 20PC £14.99", spicy: 1, image: "/dishes/peri-peri-wings.png" },
      { id: "lamb-loin-chops", name: "Lamb Loin Chops", price: "£12.99", description: "4 pcs, New Zealand prime lamb, marinated overnight. Served with rice, salad or chips.", image: "/dishes/lamb-loin-chops.png" },
      { id: "jumbo-king-prawns", name: "Grilled Jumbo King Prawns", price: "£14.99", description: "4 jumbo king prawns. Served with salad & chips.", image: "/dishes/jumbo-king-prawns.png" },
    ],
  },
  {
    id: "chicken-bites",
    label: "Chicken Bites",
    title: "Boneless Chicken Bites",
    subtitle: "Crispy, tender boneless chicken tossed in your choice of bold sauce — no extra charge.",
    priceLabel: "£7.99",
    items: [
      { id: "chicken-popcorn", name: "Chicken Popcorn", note: "10 PCS", image: "/dishes/chicken-popcorn.png" },
      { id: "chicken-tenders", name: "Chicken Tenders", note: "5 PCS", image: "/dishes/chicken-tenders.png" },
      { id: "crispy-chicken-chunks", name: "Crispy Chicken Chunks", note: "6 PCS", image: "/dishes/crispy-chicken-chunks.png" },
      { id: "buffalo-wings", name: "Buffalo Wings", note: "5 PCS", spicy: 1, image: "/dishes/buffalo-wings.png" },
    ],
  },
  {
    id: "vegan",
    label: "Vegan Nation",
    title: "Vegan Nation",
    subtitle: "Served in a vegan bun with lettuce, tomato, red onion & vegan mayo. Comes with chips and a 330ml drink.",
    priceLabel: "£9.99",
    items: [
      { id: "hot-dog-vegano", name: "Hot Dog – Vegano", description: "Plant-based frankfurter, plant proteins.", image: "/dishes/hot-dog-vegano.png" },
      { id: "moving-mountains", name: "Moving Mountains", description: "Packed with plant protein.", image: "/dishes/moving-mountains.png" },
      { id: "buttermilk-style", name: "Buttermilk Style", description: "Krokante plant-based fillet.", image: "/dishes/buttermilk-style.png" },
      { id: "louisiana-vegan-chicken", name: "Louisiana Vegan Chicken Burger", description: "Plant-based chicken fillet.", image: "/dishes/louisiana-vegan-chicken.png" },
      { id: "vegan-cheese-burger", name: "Vegan Cheese Burger", description: "Plant-based patty, vegan cheese.", image: "/dishes/vegan-cheese-burger.png" },
    ],
  },
  {
    id: "kids",
    label: "Kids Nation",
    title: "Kids Nation",
    subtitle: "Served with chips and a 330ml drink.",
    priceLabel: "£8.99",
    items: [
      { id: "kids-cheese-burger", name: "Cheese Burger", image: "/dishes/kids-cheese-burger.png" },
      { id: "kids-chicken-burger", name: "Southern Fried Chicken Burger", image: "/dishes/kids-chicken-burger.png" },
      { id: "kids-chicken-wrap", name: "Chicken Wrap", image: "/dishes/kids-chicken-wrap.png" },
      { id: "kids-chicken-nuggets", name: "Chicken Nuggets", image: "/dishes/kids-chicken-nuggets.png" },
      { id: "kids-chicken-popcorn", name: "Chicken Popcorn", image: "/dishes/chicken-popcorn.png" },
      { id: "kids-mac-cheese", name: "Mac 'n' Cheese", image: "/dishes/kids-mac-cheese.png" },
    ],
  },
  {
    id: "salad",
    label: "Salad",
    title: "Salad Nation",
    priceLabel: "£5.99",
    items: [
      {
        id: "greek-salad",
        name: "Greek Salad",
        note: "VEGETARIAN",
        description: "Lettuce, tomatoes, onions, olives, cucumber & feta, olive oil dressing.",
        image: "/dishes/greek-salad.png",
      },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    title: "Side Nation",
    priceLabel: "£4.99",
    items: [
      { id: "macaroni-cheese-bites", name: "Macaroni Cheese Bites", image: "/dishes/macaroni-cheese-bites.png" },
      { id: "mozzarella-sticks", name: "Mozzarella Sticks", image: "/dishes/mozzarella-sticks.png" },
      { id: "onion-rings", name: "Onion Rings", image: "/dishes/onion-rings.png" },
      { id: "coleslaw", name: "Coleslaw", image: "/dishes/coleslaw.png" },
      { id: "spicy-rice", name: "Spicy Rice", spicy: 1, image: "/dishes/spicy-rice.png" },
      { id: "spicy-wedges", name: "Spicy Wedges", spicy: 1, image: "/dishes/spicy-wedges.png" },
      { id: "halloumi-fries", name: "Halloumi Fries", image: "/dishes/halloumi-fries.png" },
    ],
  },
  {
    id: "chips",
    label: "Chips",
    title: "Chips Nation",
    items: [
      { id: "plain-chips", name: "Plain Chips", price: "£2.99", image: "/dishes/plain-chips.png" },
      { id: "peri-peri-chips", name: "Peri-Peri Chips", price: "£2.99", spicy: 1, image: "/dishes/peri-peri-chips.png" },
      { id: "sweet-potato-fries", name: "Sweet Potato Fries", price: "£4.99", image: "/dishes/sweet-potato-fries.png" },
      { id: "cheesy-chips", name: "Cheesy Chips", price: "£4.99", image: "/dishes/cheesy-chips.png" },
      { id: "southern-fried-spiral-fries", name: "Southern Fried Spiral Fries", price: "£4.99", image: "/dishes/southern-fried-spiral-fries.png" },
      { id: "waffle-cut-fries", name: "Waffle-Cut Fries", price: "£4.99", image: "/dishes/waffle-cut-fries.png" },
      { id: "diced-potatoes", name: "Diced Potatoes", price: "£4.99", image: "/dishes/diced-potatoes.png" },
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    title: "Shakes & Slush",
    items: [
      {
        id: "milkshake",
        name: "Milkshake",
        note: "£4.99",
        description: "Oreo · Ferrero Rocher · Kinder Bueno · Aero Mint · Snickers · Chocolate · Strawberry · Biscoff · Maltesers. Topped with whipped cream.",
        image: "/dishes/milkshake.png",
      },
      {
        id: "tango-ice-blast",
        name: "Tango Ice Blast",
        note: "SMALL £4.99 · LARGE £6.99",
        description: "Cherry · Mixed · Raspberry.",
        image: "/dishes/tango-ice-blast.png",
      },
    ],
  },
  {
    id: "sweets",
    label: "Desserts",
    title: "Waffles & Cakes",
    items: [
      { id: "belgian-waffle", name: "Belgian Waffle", price: "£4.99", description: "Plain, banana or strawberry — with ice cream or whipped cream.", image: "/dishes/belgian-waffle.png" },
      { id: "cake", name: "Cake", price: "£4.99", description: "Ask about today's selection.", image: "/dishes/cake.png" },
    ],
  },
];
