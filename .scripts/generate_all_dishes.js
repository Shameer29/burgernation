import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/dishes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Map of missing dishes to SVG graphic generators with completely transparent background
const dishes = {
  "classic-plain-smash": { title: "Classic Plain Smash", type: "smash", color: "#E05A10" },
  "truffle-smash": { title: "Truffle Smash", type: "smash", color: "#3A2820", truffle: true },
  "bacon-stacker-smash": { title: "Bacon Stacker Smash", type: "smash", color: "#B83015", bacon: true },
  "mexican-drizzle-smash": { title: "Mexican Drizzle Smash", type: "smash", color: "#2E7D32", jalapeno: true },
  "bbq-smokey-smash": { title: "BBQ Smokey Smash", type: "smash", color: "#4A150B", bbq: true },
  "gypsy-king": { title: "The Gypsy King", type: "smash", color: "#D97706", premium: true },
  "tmt": { title: "T·M·T — The Meat Talk", type: "smash", color: "#991B1B", doner: true },
  "incredible-hulk": { title: "Incredible Hulk", type: "smash", color: "#15803D", chicken: true },
  "overdose": { title: "O·V·E·R·D·O·S·E", type: "smash", color: "#F59E0B", doubleCheese: true },

  "original-plain-cheese": { title: "Original Plain Cheese Burger", type: "beef", color: "#EAB308" },
  "new-yorker": { title: "New Yorker", type: "beef", color: "#CA8A04" },
  "bacon-stack": { title: "Bacon Stack", type: "beef", color: "#991B1B" },
  "inferno-fiery": { title: "Inferno Fiery", type: "beef", color: "#DC2626", spicy: true },
  "bulls-eye-bbq-burger": { title: "Bull's Eye BBQ", type: "beef", color: "#78350F" },

  "wtf": { title: "WTF", type: "double", color: "#B91C1C" },
  "big-mama": { title: "Big Mama", type: "double", color: "#D97706" },
  "big-daddy": { title: "Big Daddy", type: "double", color: "#166534" },
  "brisket-burger": { title: "Brisket Burger", type: "double", color: "#451A03" },

  "classic-fillet": { title: "Classic Fillet Burger", type: "chicken_burger", color: "#F59E0B" },
  "cheesy-zinger-stacker": { title: "Cheesy Zinger Stacker", type: "chicken_burger", color: "#EAB308" },
  "chicken-parmeshan": { title: "Chicken Parmeshan", type: "chicken_burger", color: "#FEF08A" },
  "nashville-burger": { title: "Nashville Burger", type: "chicken_burger", color: "#B91C1C", spicy: true },
  "buldak-burger": { title: "Buldak Burger", type: "chicken_burger", color: "#7F1D1D", spicy: true },
  "korean-hot-honey-burger": { title: "Korean Hot Honey Burger", type: "chicken_burger", color: "#D97706" },
  "dynamite-dunk": { title: "Dynamite Dunk", type: "chicken_burger", color: "#EA580C" },
  "peri-peri-grill-burger": { title: "Peri-Peri Grill Burger", type: "chicken_burger", color: "#C2410C" },
  "mango-habanero-burger": { title: "Mango & Habanero Grill Burger", type: "chicken_burger", color: "#F59E0B" },
  "chick-a-boo": { title: "Chick-A-Boo", type: "chicken_burger", color: "#D97706" },
  "chick-n-doner": { title: "Chick 'N' Doner", type: "chicken_burger", color: "#9A3412" },

  "peri-peri-wings": { title: "Peri-Peri Grilled Wings", type: "wings", color: "#EA580C" },

  "hot-dog-vegano": { title: "Hot Dog – Vegano", type: "hotdog", color: "#15803D" },
  "moving-mountains": { title: "Moving Mountains", type: "vegan", color: "#166534" },
  "buttermilk-style": { title: "Buttermilk Style", type: "vegan", color: "#65A30D" },
  "louisiana-vegan-chicken": { title: "Louisiana Vegan Chicken", type: "vegan", color: "#84CC16" },

  "kids-cheese-burger": { title: "Kids Cheese Burger", type: "burger", color: "#F59E0B" },
  "kids-chicken-burger": { title: "Kids Chicken Burger", type: "burger", color: "#EAB308" },
  "kids-chicken-wrap": { title: "Kids Chicken Wrap", type: "wrap", color: "#84CC16" },
  "kids-chicken-nuggets": { title: "Kids Chicken Nuggets", type: "bites", color: "#D97706" },
  "kids-mac-cheese": { title: "Kids Mac 'n' Cheese", type: "mac", color: "#F59E0B" },

  "macaroni-cheese-bites": { title: "Macaroni Cheese Bites", type: "side", color: "#F59E0B" },
  "mozzarella-sticks": { title: "Mozzarella Sticks", type: "side", color: "#D97706" },
  "onion-rings": { title: "Onion Rings", type: "side", color: "#EAB308" },
  "coleslaw": { title: "Coleslaw", type: "side", color: "#FEF08A" },
  "spicy-rice": { title: "Spicy Rice", type: "side", color: "#EA580C" },
  "spicy-wedges": { title: "Spicy Wedges", type: "side", color: "#C2410C" },
  "halloumi-fries": { title: "Halloumi Fries", type: "side", color: "#FDE047" },

  "plain-chips": { title: "Plain Chips", type: "chips", color: "#F59E0B" },
  "peri-peri-chips": { title: "Peri-Peri Chips", type: "chips", color: "#EA580C" },
  "sweet-potato-fries": { title: "Sweet Potato Fries", type: "chips", color: "#C2410C" },
  "cheesy-chips": { title: "Cheesy Chips", type: "chips", color: "#EAB308" },
  "southern-fried-spiral-fries": { title: "Spiral Fries", type: "chips", color: "#D97706" },
  "waffle-cut-fries": { title: "Waffle-Cut Fries", type: "chips", color: "#CA8A04" },
  "diced-potatoes": { title: "Diced Potatoes", type: "chips", color: "#EAB308" },

  "tango-ice-blast": { title: "Tango Ice Blast", type: "drink", color: "#0284C7" },
  "belgian-waffle": { title: "Belgian Waffle", type: "dessert", color: "#78350F" },
  "cake": { title: "Cake", type: "dessert", color: "#B91C1C" }
};

function generateBurgerSVG(name, color, isDouble = false, isChicken = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <radialGradient id="grad-glow-${name}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bun-top-${name}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F5A04F"/>
        <stop offset="50%" stop-color="#D97529"/>
        <stop offset="100%" stop-color="#AD4B0F"/>
      </linearGradient>
      <linearGradient id="patty-${name}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${isChicken ? '#E68A2E' : '#4A2118'}"/>
        <stop offset="100%" stop-color="${isChicken ? '#994D00' : '#210B07'}"/>
      </linearGradient>
      <linearGradient id="cheese-${name}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFD000"/>
        <stop offset="100%" stop-color="#FF9900"/>
      </linearGradient>
      <filter id="shadow-${name}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="15" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>
    <circle cx="250" cy="250" r="220" fill="url(#grad-glow-${name})"/>
    <g filter="url(#shadow-${name})">
      <path d="M120,360 Q250,380 380,360 Q390,390 370,410 Q250,425 130,410 Q110,390 120,360 Z" fill="#D97529"/>
      <path d="M100,320 Q250,310 400,320 Q415,355 385,370 Q250,375 115,370 Q85,355 100,320 Z" fill="url(#patty-${name})"/>
      <path d="M110,320 L130,345 L150,322 L190,350 L230,320 L270,355 L310,322 L350,348 L390,320 Q395,335 385,340 Q250,355 115,340 Z" fill="url(#cheese-${name})"/>
      ${isDouble ? `
      <path d="M95,270 Q250,260 405,270 Q420,305 390,320 Q250,325 110,320 Q80,305 95,270 Z" fill="url(#patty-${name})"/>
      <path d="M105,275 L125,295 L145,275 L185,305 L225,275 L265,305 L305,275 L345,300 L385,275 Q390,290 380,295 Q250,310 110,295 Z" fill="url(#cheese-${name})"/>
      ` : ''}
      <path d="M90,${isDouble ? 230 : 280} Q140,${isDouble ? 210 : 260} 190,${isDouble ? 235 : 285} Q250,${isDouble ? 205 : 255} 310,${isDouble ? 235 : 285} Q360,${isDouble ? 210 : 260} 410,${isDouble ? 230 : 280} Q420,${isDouble ? 255 : 305} 390,${isDouble ? 260 : 310} Q250,${isDouble ? 250 : 300} 110,${isDouble ? 260 : 310} Z" fill="#38A169"/>
      <ellipse cx="180" cy="${isDouble ? 220 : 270}" rx="45" ry="12" fill="#E53E3E"/>
      <ellipse cx="320" cy="${isDouble ? 215 : 265}" rx="50" ry="14" fill="#E53E3E"/>
      <path d="M110,${isDouble ? 210 : 260} C100,100 400,100 390,${isDouble ? 210 : 260} Q250,${isDouble ? 225 : 275} 110,${isDouble ? 210 : 260} Z" fill="url(#bun-top-${name})"/>
      <ellipse cx="200" cy="${isDouble ? 140 : 180}" rx="6" ry="3" fill="#FFFBEB" transform="rotate(-15 200 ${isDouble ? 140 : 180})"/>
      <ellipse cx="270" cy="${isDouble ? 130 : 170}" rx="6" ry="3" fill="#FFFBEB" transform="rotate(10 270 ${isDouble ? 130 : 170})"/>
      <ellipse cx="320" cy="${isDouble ? 150 : 190}" rx="6" ry="3" fill="#FFFBEB" transform="rotate(25 320 ${isDouble ? 150 : 190})"/>
    </g>
  </svg>`;
}

function generateSideSVG(name, color, type) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <radialGradient id="grad-glow-${name}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="item-grad-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FBBF24"/>
        <stop offset="50%" stop-color="#D97706"/>
        <stop offset="100%" stop-color="#92400E"/>
      </linearGradient>
      <filter id="shadow-${name}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>
    <circle cx="250" cy="250" r="220" fill="url(#grad-glow-${name})"/>
    <g filter="url(#shadow-${name})">
      ${type === 'chips' ? `
        <path d="M160,200 L180,420 Q250,440 320,420 L340,200 Z" fill="#DC2626"/>
        <path d="M160,200 Q250,220 340,200 Q250,180 160,200 Z" fill="#EF4444"/>
        <rect x="180" y="80" width="22" height="180" rx="4" fill="url(#item-grad-${name})" transform="rotate(-15 180 80)"/>
        <rect x="210" y="70" width="22" height="190" rx="4" fill="url(#item-grad-${name})" transform="rotate(-5 210 70)"/>
        <rect x="240" y="65" width="22" height="200" rx="4" fill="url(#item-grad-${name})" transform="rotate(2 240 65)"/>
        <rect x="270" y="75" width="22" height="185" rx="4" fill="url(#item-grad-${name})" transform="rotate(12 270 75)"/>
        <rect x="300" y="90" width="22" height="170" rx="4" fill="url(#item-grad-${name})" transform="rotate(22 300 90)"/>
      ` : type === 'drink' ? `
        <path d="M170,180 L190,410 Q250,430 310,410 L330,180 Z" fill="rgba(255,255,255,0.2)" stroke="#38BDF8" stroke-width="4"/>
        <path d="M175,200 L188,390 Q250,410 312,390 L325,200 Z" fill="#0284C7"/>
        <path d="M175,280 L188,390 Q250,410 312,390 L325,280 Z" fill="#E11D48"/>
        <path d="M150,180 C150,100 350,100 350,180 Z" fill="rgba(255,255,255,0.3)" stroke="#E0F2FE" stroke-width="4"/>
        <rect x="240" y="40" width="20" height="160" rx="5" fill="#FACC15" transform="rotate(-12 240 40)"/>
      ` : `
        <ellipse cx="200" cy="220" rx="60" ry="40" fill="url(#item-grad-${name})"/>
        <ellipse cx="300" cy="230" rx="65" ry="45" fill="url(#item-grad-${name})"/>
        <ellipse cx="250" cy="300" rx="70" ry="45" fill="url(#item-grad-${name})"/>
        <ellipse cx="180" cy="330" rx="55" ry="38" fill="url(#item-grad-${name})"/>
        <ellipse cx="320" cy="320" rx="58" ry="40" fill="url(#item-grad-${name})"/>
      `}
    </g>
  </svg>`;
}

Object.entries(dishes).forEach(([id, info]) => {
  const pngPath = path.join(outputDir, `${id}.png`);
  const svgPath = path.join(outputDir, `${id}.svg`);
  
  if (!fs.existsSync(pngPath) && !fs.existsSync(svgPath)) {
    const isBurger = ['smash', 'beef', 'double', 'chicken_burger', 'vegan', 'burger'].includes(info.type);
    const svgContent = isBurger 
      ? generateBurgerSVG(id, info.color, info.type === 'double', info.type === 'chicken_burger' || info.chicken)
      : generateSideSVG(id, info.color, info.type);
    
    fs.writeFileSync(svgPath, svgContent);
  }
});

console.log('Successfully generated transparent food graphics for all menu items!');
