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
    id: "smash-burgers",
    label: "Smash Burgers",
    title: "Smash Burgers",
    subtitle: "Two 3oz smashed Angus beef patties in a seeded brioche bun with lettuce, mayonnaise, gherkins, American cheese & house sauce.",
    featured: true,
    priceLabel: "£8.99",
    items: [
      { id: "classic-plain-smash", name: "Classic Plain Smash", price: "£8.99", description: "Two smashed Angus patties, American cheese, gherkins & house sauce.", image: "/dishes/classic-plain-smash.png" },
      { id: "truffle-smash", name: "Truffle Smash", price: "£8.99", description: "Fried onions & truffle sauce.", image: "/dishes/truffle-smash.png" },
      { id: "bacon-stacker-smash", name: "Bacon Stacker Smash", price: "£8.99", description: "Beef bacon and house sauce.", image: "/dishes/bacon-stacker-smash.png" },
      { id: "mexican-drizzle-smash", name: "Mexican Drizzle Smash", price: "£8.99", spicy: 1, description: "Gherkins, jalapeños & mild salsa sauce.", image: "/dishes/mexican-drizzle-smash.png" },
      { id: "bbq-smokey-smash", name: "BBQ Smokey Smash", price: "£8.99", description: "Gherkins & BBQ sauce.", image: "/dishes/bbq-smokey-smash.png" },
    ],
  },
  {
    id: "premium-smash-burgers",
    label: "Premium Smash",
    title: "Premium Smash Burgers",
    subtitle: "Elevated smash creations loaded with bold, indulgent toppings.",
    priceLabel: "£10.99",
    items: [
      { id: "gypsy-king", name: "The Gypsy King", price: "£10.99", description: "Fried egg, caramelized onions, mayonnaise, gherkins & house sauce.", image: "/dishes/gypsy-king.png" },
      { id: "tmt", name: "T M T – The Meat Talk", price: "£10.99", description: "Lamb doner meat, caramelized onions & house sauce.", image: "/dishes/tmt.png" },
      { id: "incredible-hulk", name: "Incredible Hulk", price: "£10.99", description: "Grilled chicken fillet, house sauce & gherkins.", image: "/dishes/incredible-hulk.png" },
      { id: "overdose", name: "O-V-E-R-D-O-S-E", price: "£10.99", note: "LOADED", description: "Double American cheese, topped with fried onion, gherkins & house sauce.", image: "/dishes/overdose.png" },
    ],
  },
  {
    id: "beef-burgers",
    label: "Beef Burgers",
    title: "Classic Gourmet Beef Burgers",
    subtitle: "6oz burgers served in a toasted brioche bun with mayo, lettuce, tomato & red onion. Served with chips and a drink (330ml can).",
    priceLabel: "£11.99 · 6oz",
    items: [
      { id: "original-plain-cheese", name: "Original Plain Cheese Burger", price: "£11.99", image: "/dishes/original-plain-cheese.png" },
      { id: "new-yorker", name: "New Yorker", price: "£11.99", description: "Lettuce, mustard & burger relish.", image: "/dishes/new-yorker.png" },
      { id: "bacon-stack", name: "Bacon Stack", price: "£11.99", description: "Beef bacon with house sauce.", image: "/dishes/bacon-stack.png" },
      { id: "inferno-fiery", name: "Inferno Fiery", price: "£11.99", spicy: 2, description: "Our hot house sauce.", image: "/dishes/inferno-fiery.png" },
      { id: "bulls-eye-bbq-burger", name: "Bull's Eye BBQ", price: "£11.99", description: "Smoky Bull's Eye BBQ glaze.", image: "/dishes/bulls-eye-bbq-burger.png" },
    ],
  },
  {
    id: "premium-double-patty-burgers",
    label: "Double Patty",
    title: "Premium Double Patty Burgers",
    subtitle: "12oz double patty burgers served in a toasted brioche bun with lettuce, tomato & red onion. Served with chips and a drink (330ml can).",
    priceLabel: "£13.99 · 12oz",
    items: [
      { id: "wtf", name: "WTF (Where's The Food)", price: "£13.99", note: "LOADED", description: "Grilled beef sausage, fried onions, Bull's Eye BBQ sauce, burger relish & sweet chilli sauce.", image: "/dishes/wtf.png" },
      { id: "big-mama", name: "Big Mama", price: "£13.99", description: "Southern fried chicken fillet, gherkins, burger relish & sweet chilli sauce.", image: "/dishes/big-mama.png" },
      { id: "big-daddy", name: "Big Daddy", price: "£13.99", spicy: 1, description: "Fried egg, jalapeños, mustard sauce, burger relish & sweet chilli sauce.", image: "/dishes/big-daddy.png" },
      { id: "brisket-burger", name: "Brisket Burger", price: "£13.99", note: "PREMIUM", description: "Sliced smoked brisket, BBQ sauce & fried onions.", image: "/dishes/brisket-burger.png" },
    ],
  },
  {
    id: "chicken-burgers",
    label: "Chicken Burgers",
    title: "Chicken Burgers",
    subtitle: "Crispy chicken fillet in a toasted brioche bun with lettuce & American cheese. Served with chips and a drink (330ml can).",
    items: [
      { id: "classic-fillet", name: "The Classic Fillet Burger", price: "£9.99", description: "Mayo & fresh lettuce.", image: "/dishes/classic-fillet.png" },
      { id: "cheesy-zinger-stacker", name: "Cheesy Zinger Stacker", price: "£9.99", description: "Hash brown, nacho cheesy sauce & salsa sauce.", image: "/dishes/cheesy-zinger-stacker.png" },
      { id: "chicken-parmeshan", name: "Chicken Parmeshan", price: "£9.99", description: "Parmesan sauce, lettuce & red onions.", image: "/dishes/chicken-parmeshan.png" },
      { id: "nashville-burger", name: "Nashville", price: "£9.99", spicy: 2, note: "HOT", description: "Dipped in our Nashville spice, topped with fresh creamy coleslaw & pickles.", image: "/dishes/nashville-burger.png" },
      { id: "buldak-burger", name: "Buldak", price: "£9.99", spicy: 3, note: "VERY HOT", description: "Lettuce, fried onion & Buldak sauce.", image: "/dishes/buldak-burger.png" },
      { id: "korean-hot-honey-burger", name: "Korean Hot Honey", price: "£9.99", spicy: 1, description: "Red onions, jalapeños & Korean Hot Honey sauce.", image: "/dishes/korean-hot-honey-burger.png" },
      { id: "dynamite-dunk", name: "Dynamite Dunk", price: "£9.99", description: "Dunked in our house sauce, lettuce, red onions & gherkins.", image: "/dishes/dynamite-dunk.png" },
      { id: "peri-peri-grill-burger", name: "Peri-Peri Grill Burger", price: "£10.99", description: "Flame-grilled with melted cheese & peri peri sauce.", image: "/dishes/peri-peri-grill-burger.png" },
      { id: "mango-habanero-burger", name: "Mango & Habanero Grill Burger", price: "£10.99", spicy: 2, description: "Flame-grilled with melted cheese & peri peri sauce.", image: "/dishes/mango-habanero-burger.png" },
      { id: "chick-a-boo", name: "Chick-A-Boo", price: "£10.99", description: "Fried crispy chicken fillet & grilled chicken fillet with house sauce.", image: "/dishes/chick-a-boo.png" },
      { id: "chick-n-doner", name: "Chick 'N' Doner", price: "£10.99", description: "Crispy chicken fillet & lamb doner meat with house sauce.", image: "/dishes/chick-n-doner.png" },
    ],
  },
  {
    id: "kids-nation",
    label: "Kids Nation",
    title: "Kids Nation",
    subtitle: "Mini meals made for kids, served with chips and a drink (330ml can).",
    priceLabel: "£8.99",
    items: [
      { id: "kids-cheese-burger", name: "Cheese Burger", price: "£8.99", image: "/dishes/kids-cheese-burger.png" },
      { id: "kids-southern-fried-chicken-burger", name: "Southern Fried Chicken Burger", price: "£8.99", image: "/dishes/kids-chicken-burger.png" },
      { id: "kids-chicken-wrap", name: "Chicken Wrap", price: "£8.99", image: "/dishes/kids-chicken-wrap.png" },
      { id: "kids-chicken-nuggets", name: "Chicken Nuggets", price: "£8.99", image: "/dishes/kids-chicken-nuggets.png" },
      { id: "kids-chicken-popcorn", name: "Chicken Popcorn", price: "£8.99", image: "/dishes/kids-chicken-popcorn.png" },
      { id: "kids-mac-cheese", name: "Mac N' Cheese", price: "£8.99", veg: true, image: "/dishes/kids-mac-cheese.png" },
    ],
  },
  {
    id: "vegan-nation",
    label: "Vegan Nation",
    title: "Vegan Nation",
    subtitle: "All our vegan burgers are served in a vegan bun with lettuce, tomato, red onion & vegan mayo. Served with chips and a drink (330ml can).",
    priceLabel: "£9.99",
    items: [
      { id: "hot-dog-vegano", name: "Hot Dog – Vegano", price: "£9.99", veg: true, description: "Plant-based hot dog (frankfurter) with plant proteins & irresistible juiciness.", image: "/dishes/hot-dog-vegano.png" },
      { id: "moving-mountains", name: "Moving Mountains", price: "£9.99", veg: true, description: "Packed with plant protein & irresistible juiciness.", image: "/dishes/moving-mountains.png" },
      { id: "buttermilk-style", name: "Buttermilk Style", price: "£9.99", veg: true, description: "Krokante fillet burger.", image: "/dishes/buttermilk-style.png" },
      { id: "louisiana-vegan-chicken", name: "Louisiana Vegan Chicken Burger", price: "£9.99", veg: true, description: "Plant-based chicken fillet.", image: "/dishes/louisiana-vegan-chicken.png" },
      { id: "vegan-cheese-burger", name: "Vegan Cheese Burger", price: "£9.99", veg: true, description: "Plant-based patty topped with vegan cheese.", image: "/dishes/vegan-cheese-burger.png" },
    ],
  },
  {
    id: "peri-peri-grill",
    label: "Peri-Peri & Grill",
    title: "Peri-Peri Chicken & Grill",
    subtitle: "Chicken on the bone marinated overnight in our signature homemade sauce and flame-grilled to perfection. All items come with the sauce of your choice — no extra charge!",
    items: [
      { id: "peri-peri-chicken", name: "Peri-Peri Chicken", price: "£11.99 / £16.99", note: "HALF · FULL", description: "Chicken on the bone, marinated overnight, flame-grilled to perfection.", image: "/dishes/peri-peri-chicken.png" },
      { id: "lamb-loin-chops", name: "Lamb Loin Chops", price: "£12.99", description: "4pcs New Zealand prime lamb chops marinated overnight, served with rice, salad or chips.", image: "/dishes/lamb-loin-chops.png" },
      { id: "jumbo-king-prawns", name: "Grilled Jumbo King Prawns", price: "£14.99", description: "4 jumbo king prawns served with salad & chips.", image: "/dishes/jumbo-king-prawns.png" },
      { id: "peri-peri-wings", name: "Peri-Peri Grilled Wings", price: "£6.99 / £11.99 / £14.99", note: "6 · 12 · 20 PCS", description: "Flame-grilled wings tossed in your choice of sauce.", image: "/dishes/peri-peri-wings.png" },
    ],
  },
  {
    id: "boneless-chicken-bites",
    label: "Chicken Bites",
    title: "Boneless Chicken Bites",
    subtitle: "Crispy, tender boneless chicken pieces, perfectly cooked & tossed in our bold sauces.",
    priceLabel: "£7.99",
    items: [
      { id: "chicken-popcorn", name: "Chicken Popcorn", price: "£7.99", note: "10 PCS", image: "/dishes/chicken-popcorn.png" },
      { id: "chicken-tenders", name: "Chicken Tenders", price: "£7.99", note: "5 PCS", image: "/dishes/chicken-tenders.png" },
      { id: "crispy-chicken-chunks", name: "Crispy Chicken Chunks", price: "£7.99", note: "6 PCS", image: "/dishes/crispy-chicken-chunks.png" },
      { id: "buffalo-wings", name: "Buffalo Wings", price: "£7.99", note: "5 PCS", spicy: 1, image: "/dishes/buffalo-wings.png" },
    ],
  },
  {
    id: "chips-nation",
    label: "Chips Nation",
    title: "Chips Nation",
    subtitle: "Golden, crispy, and made to share.",
    items: [
      { id: "plain-chips", name: "Plain Chips", price: "£2.99", veg: true, image: "/dishes/plain-chips.png" },
      { id: "peri-peri-chips", name: "Peri Peri Chips", price: "£2.99", veg: true, spicy: 1, image: "/dishes/peri-peri-chips.png" },
      { id: "sweet-potato-fries", name: "Sweet Potato Fries", price: "£4.99", veg: true, image: "/dishes/sweet-potato-fries.png" },
      { id: "cheesy-chips", name: "Cheesy Chips", price: "£4.99", veg: true, image: "/dishes/cheesy-chips.png" },
      { id: "southern-fried-spiral-fries", name: "Southern Fried Spiral Fries", price: "£4.99", veg: true, image: "/dishes/southern-fried-spiral-fries.png" },
      { id: "waffle-cut-fries", name: "Waffle-Cut Fries", price: "£4.99", veg: true, image: "/dishes/waffle-cut-fries.png" },
      { id: "diced-potatoes", name: "Diced Potatoes", price: "£4.99", veg: true, image: "/dishes/diced-potatoes.png" },
    ],
  },
  {
    id: "sides-salad",
    label: "Sides & Salad",
    title: "Side Nation & Salad Nation",
    subtitle: "Sides £4.99 each · Salad £5.99",
    items: [
      { id: "macaroni-cheese-bites", name: "Macaroni Cheese Bites", price: "£4.99", veg: true, image: "/dishes/macaroni-cheese-bites.png" },
      { id: "mozzarella-sticks", name: "Mozzarella Sticks", price: "£4.99", veg: true, image: "/dishes/mozzarella-sticks.png" },
      { id: "onion-rings", name: "Onion Rings", price: "£4.99", veg: true, image: "/dishes/onion-rings.png" },
      { id: "coleslaw", name: "Coleslaw", price: "£4.99", veg: true, image: "/dishes/coleslaw.png" },
      { id: "spicy-rice", name: "Spicy Rice", price: "£4.99", veg: true, spicy: 1, image: "/dishes/spicy-rice.png" },
      { id: "halloumi-fries", name: "Halloumi Fries", price: "£4.99", veg: true, image: "/dishes/halloumi-fries.png" },
      { id: "spicy-wedges", name: "Spicy Wedges", price: "£4.99", veg: true, spicy: 1, image: "/dishes/spicy-wedges.png" },
      { id: "greek-salad", name: "Greek Salad", price: "£5.99", veg: true, description: "Lettuce, tomatoes, onions, olives, cucumber & feta cheese with a dash of olive oil dressing.", image: "/dishes/greek-salad.png" },
    ],
  },
  {
    id: "shakes-drinks",
    label: "Shakes & Drinks",
    title: "Milkshakes & Drinks",
    subtitle: "All our shakes come served with a swirl of whipped cream.",
    priceLabel: "£4.99",
    items: [
      { id: "oreo-shake", name: "Oreo", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "ferrero-rocher-shake", name: "Ferrero Rocher", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "kinder-bueno-shake", name: "Kinder Bueno", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "aero-mint-shake", name: "Aero Mint", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "snickers-shake", name: "Snickers", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "chocolate-shake", name: "Chocolate", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "strawberry-shake", name: "Strawberry", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "biscoff-shake", name: "Biscoff", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "maltesers-shake", name: "Maltesers", price: "£4.99", image: "/dishes/milkshake.png" },
      { id: "tango-ice-blast", name: "Tango Ice Blast", price: "£4.99 / £6.99", note: "SML · LRG", description: "Icy slush blast — Cherry, Mixed or Raspberry.", image: "/dishes/tango-ice-blast.png" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    title: "Waffles & Cakes",
    subtitle: "Sweet finishes to your Burger Nation feast.",
    priceLabel: "£4.99",
    items: [
      { id: "waffle", name: "Waffle", price: "£4.99", description: "Plain, banana or strawberry waffle served with ice cream or whipped cream.", image: "/dishes/belgian-waffle.png" },
      { id: "cake", name: "Cake", price: "£4.99", description: "Choice of cakes.", image: "/dishes/cake.png" },
    ],
  },
];
