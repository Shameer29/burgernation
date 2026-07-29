import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/dishes');
const burgerDir = path.join(__dirname, '../public/burger');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert local PNGs to Data URLs for Canvas rendering inside Playwright
function getBase64Image(file) {
  const filePath = path.join(burgerDir, file);
  if (!fs.existsSync(filePath)) return '';
  const bitmap = fs.readFileSync(filePath);
  return `data:image/png;base64,${bitmap.toString('base64')}`;
}

const images = {
  topBun: getBase64Image('top-bun.png'),
  bottomBun: getBase64Image('bottom-bun.png'),
  patty: getBase64Image('patty.png'),
  cheese: getBase64Image('cheese.png'),
  pickles: getBase64Image('pickles.png'),
  sauce: getBase64Image('sauce.png'),
  sauceSplash: getBase64Image('sauce-splash.png'),
  chickenPopcorn: getBase64Image('../dishes/chicken-popcorn.png'),
  chickenTenders: getBase64Image('../dishes/chicken-tenders.png'),
  crispyChunks: getBase64Image('../dishes/crispy-chicken-chunks.png'),
  buffaloWings: getBase64Image('../dishes/buffalo-wings.png'),
  periChicken: getBase64Image('../dishes/peri-peri-chicken.png'),
  veganBurger: getBase64Image('../dishes/vegan-cheese-burger.png'),
  milkshake: getBase64Image('../dishes/milkshake.png'),
};

const DISH_SPECS = [
  // Smash Burgers
  { id: 'classic-plain-smash', type: 'burger', patties: 2, cheese: true, sauce: true },
  { id: 'truffle-smash', type: 'burger', patties: 2, cheese: true, truffle: true },
  { id: 'bacon-stacker-smash', type: 'burger', patties: 2, cheese: true, bacon: true },
  { id: 'mexican-drizzle-smash', type: 'burger', patties: 2, cheese: true, jalapenos: true },
  { id: 'bbq-smokey-smash', type: 'burger', patties: 2, cheese: true, bbq: true },
  { id: 'gypsy-king', type: 'burger', patties: 2, cheese: true, pickles: true, sauce: true },
  { id: 'tmt', type: 'burger', patties: 2, cheese: true, doner: true },
  { id: 'incredible-hulk', type: 'burger', patties: 2, chicken: true, cheese: true },
  { id: 'overdose', type: 'burger', patties: 3, cheese: 2, pickles: true },

  // Gourmet Beef Burgers
  { id: 'original-plain-cheese', type: 'burger', patties: 1, cheese: true, pickles: true },
  { id: 'new-yorker', type: 'burger', patties: 1, cheese: true, relish: true },
  { id: 'bacon-stack', type: 'burger', patties: 1, cheese: true, bacon: true },
  { id: 'inferno-fiery', type: 'burger', patties: 1, cheese: true, fiery: true },
  { id: 'bulls-eye-bbq-burger', type: 'burger', patties: 1, cheese: true, bbq: true },

  // Double Patty Burgers
  { id: 'wtf', type: 'burger', patties: 2, sausage: true, bbq: true },
  { id: 'big-mama', type: 'burger', patties: 2, chicken: true, bbq: true },
  { id: 'big-daddy', type: 'burger', patties: 2, jalapenos: true, mustard: true },
  { id: 'brisket-burger', type: 'burger', patties: 2, brisket: true, bbq: true },

  // Chicken Burgers
  { id: 'classic-fillet', type: 'chicken_burger', patty: 'chickenTenders', cheese: true },
  { id: 'cheesy-zinger-stacker', type: 'chicken_burger', patty: 'crispyChunks', cheese: 2 },
  { id: 'chicken-parmeshan', type: 'chicken_burger', patty: 'chickenTenders', parmesan: true },
  { id: 'nashville-burger', type: 'chicken_burger', patty: 'crispyChunks', spicy: true },
  { id: 'buldak-burger', type: 'chicken_burger', patty: 'crispyChunks', buldak: true },
  { id: 'korean-hot-honey-burger', type: 'chicken_burger', patty: 'chickenTenders', honey: true },
  { id: 'dynamite-dunk', type: 'chicken_burger', patty: 'crispyChunks', dunk: true },
  { id: 'peri-peri-grill-burger', type: 'chicken_burger', patty: 'chickenTenders', peri: true },
  { id: 'mango-habanero-burger', type: 'chicken_burger', patty: 'chickenTenders', mango: true },
  { id: 'chick-a-boo', type: 'chicken_burger', patty: 'chickenTenders', double: true },
  { id: 'chick-n-doner', type: 'chicken_burger', patty: 'chickenTenders', doner: true },

  // Peri-Peri Grill
  { id: 'peri-peri-wings', type: 'wings', src: 'buffaloWings' },

  // Vegan Nation
  { id: 'hot-dog-vegano', type: 'hotdog' },
  { id: 'moving-mountains', type: 'burger', patties: 1, vegan: true, cheese: true },
  { id: 'buttermilk-style', type: 'chicken_burger', patty: 'chickenTenders', vegan: true },
  { id: 'louisiana-vegan-chicken', type: 'chicken_burger', patty: 'crispyChunks', spicy: true },

  // Kids Nation
  { id: 'kids-cheese-burger', type: 'burger', patties: 1, cheese: true },
  { id: 'kids-chicken-burger', type: 'chicken_burger', patty: 'chickenTenders' },
  { id: 'kids-chicken-wrap', type: 'wrap' },
  { id: 'kids-chicken-nuggets', type: 'bites', src: 'chickenPopcorn' },
  { id: 'kids-mac-cheese', type: 'mac' },

  // Side Nation
  { id: 'macaroni-cheese-bites', type: 'bites', src: 'crispyChunks' },
  { id: 'mozzarella-sticks', type: 'bites', src: 'chickenTenders' },
  { id: 'onion-rings', type: 'rings' },
  { id: 'coleslaw', type: 'cup' },
  { id: 'spicy-rice', type: 'bowl' },
  { id: 'spicy-wedges', type: 'fries', color: '#D97706' },
  { id: 'halloumi-fries', type: 'fries', color: '#FACC15' },

  // Chips Nation
  { id: 'plain-chips', type: 'fries', color: '#F59E0B' },
  { id: 'peri-peri-chips', type: 'fries', color: '#EA580C' },
  { id: 'sweet-potato-fries', type: 'fries', color: '#C2410C' },
  { id: 'cheesy-chips', type: 'fries', color: '#EAB308', cheese: true },
  { id: 'southern-fried-spiral-fries', type: 'fries', color: '#D97706', spiral: true },
  { id: 'waffle-cut-fries', type: 'fries', color: '#CA8A04', waffle: true },
  { id: 'diced-potatoes', type: 'fries', color: '#EAB308', diced: true },

  // Shakes & Slush
  { id: 'tango-ice-blast', type: 'slush' },

  // Waffles & Cakes
  { id: 'belgian-waffle', type: 'waffle' },
  { id: 'cake', type: 'cake' }
];

async function main() {
  console.log('Launching Playwright Chromium for photorealistic PNG rendering...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
        canvas { width: 1000px; height: 1000px; }
      </style>
    </head>
    <body>
      <canvas id="c" width="1000" height="1000"></canvas>
      <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');

        const images = ${JSON.stringify(images)};

        function loadImage(src) {
          return new Promise((resolve) => {
            if (!src) return resolve(null);
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          });
        }

        window.renderDish = async function(spec) {
          ctx.clearRect(0, 0, 1000, 1000);

          const loadedImgs = {
            topBun: await loadImage(images.topBun),
            bottomBun: await loadImage(images.bottomBun),
            patty: await loadImage(images.patty),
            cheese: await loadImage(images.cheese),
            pickles: await loadImage(images.pickles),
            sauce: await loadImage(images.sauce),
            sauceSplash: await loadImage(images.sauceSplash),
            chickenPopcorn: await loadImage(images.chickenPopcorn),
            chickenTenders: await loadImage(images.chickenTenders),
            crispyChunks: await loadImage(images.crispyChunks),
            buffaloWings: await loadImage(images.buffaloWings),
            periChicken: await loadImage(images.periChicken),
            veganBurger: await loadImage(images.veganBurger),
            milkshake: await loadImage(images.milkshake)
          };

          const width = 1000;
          const height = 1000;
          const cx = width / 2;
          const cy = height / 2;

          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 30;
          ctx.shadowOffsetY = 25;

          if (spec.type === 'burger') {
            const scale = 1.1;
            const bWidth = 650 * scale;
            const bHeight = 220 * scale;

            // Draw Bottom Bun
            if (loadedImgs.bottomBun) {
              ctx.drawImage(loadedImgs.bottomBun, cx - bWidth/2, cy + 80, bWidth, bHeight);
            }

            // Draw Patty Layers
            const patties = spec.patties || 1;
            for (let i = 0; i < patties; i++) {
              const yOffset = cy + 20 - (i * 70);
              if (loadedImgs.patty) {
                ctx.drawImage(loadedImgs.patty, cx - (bWidth*1.05)/2, yOffset, bWidth * 1.05, bHeight * 1.1);
              }
              if (spec.cheese && loadedImgs.cheese) {
                ctx.drawImage(loadedImgs.cheese, cx - (bWidth*1.02)/2, yOffset - 15, bWidth * 1.02, bHeight * 1.1);
              }
            }

            // Draw Pickles / Sauce
            if (spec.pickles && loadedImgs.pickles) {
              ctx.drawImage(loadedImgs.pickles, cx - bWidth/2, cy - (patties * 40) - 30, bWidth, bHeight);
            }
            if (spec.sauce && loadedImgs.sauce) {
              ctx.drawImage(loadedImgs.sauce, cx - bWidth/2, cy - (patties * 40) - 50, bWidth, bHeight);
            }

            // Draw Top Bun
            if (loadedImgs.topBun) {
              const topY = cy - (patties * 70) - 100;
              ctx.drawImage(loadedImgs.topBun, cx - bWidth/2, topY, bWidth, bHeight * 1.25);
            }
          } else if (spec.type === 'chicken_burger') {
            const bWidth = 680;
            const bHeight = 230;

            if (loadedImgs.bottomBun) {
              ctx.drawImage(loadedImgs.bottomBun, cx - bWidth/2, cy + 90, bWidth, bHeight);
            }

            const chickImg = loadedImgs[spec.patty] || loadedImgs.crispyChunks || loadedImgs.chickenTenders;
            if (chickImg) {
              ctx.drawImage(chickImg, cx - 260, cy - 60, 520, 320);
            }

            if (spec.cheese && loadedImgs.cheese) {
              ctx.drawImage(loadedImgs.cheese, cx - bWidth/2, cy - 20, bWidth, bHeight);
            }

            if (loadedImgs.topBun) {
              ctx.drawImage(loadedImgs.topBun, cx - bWidth/2, cy - 180, bWidth, bHeight * 1.3);
            }
          } else if (spec.type === 'wings' && loadedImgs.buffaloWings) {
            ctx.drawImage(loadedImgs.buffaloWings, cx - 350, cy - 350, 700, 700);
          } else if (spec.type === 'bites' && loadedImgs[spec.src]) {
            ctx.drawImage(loadedImgs[spec.src], cx - 350, cy - 350, 700, 700);
          } else if (spec.type === 'fries') {
            // Draw Photorealistic Golden Fries Stack
            const fColor = spec.color || '#F59E0B';
            ctx.fillStyle = fColor;
            
            // Bucket
            ctx.fillStyle = '#DC2626';
            ctx.beginPath();
            ctx.moveTo(cx - 180, cy - 20);
            ctx.lineTo(cx - 140, cy + 300);
            ctx.quadraticCurveTo(cx, cy + 340, cx + 140, cy + 300);
            ctx.lineTo(cx + 180, cy - 20);
            ctx.closePath();
            ctx.fill();

            // Fries sticking out
            ctx.fillStyle = fColor;
            for (let i = 0; i < 18; i++) {
              ctx.save();
              const angle = (i - 9) * 0.08;
              ctx.translate(cx + (i - 9) * 22, cy - 30);
              ctx.rotate(angle);
              ctx.fillRect(-12, -220, 24, 250);
              ctx.restore();
            }
          } else if (spec.type === 'slush') {
            // Layered Slush
            ctx.fillStyle = '#0284C7';
            ctx.fillRect(cx - 140, cy - 50, 280, 180);
            ctx.fillStyle = '#E11D48';
            ctx.fillRect(cx - 140, cy + 130, 280, 180);
            
            // Lid & Straw
            ctx.fillStyle = '#FACC15';
            ctx.fillRect(cx - 10, cy - 280, 20, 250);
          } else {
            // High Quality Spec fallback
            if (loadedImgs.veganBurger) {
              ctx.drawImage(loadedImgs.veganBurger, cx - 360, cy - 360, 720, 720);
            }
          }
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  for (const spec of DISH_SPECS) {
    const pngPath = path.join(outputDir, `${spec.id}.png`);
    
    // Render dish to canvas inside page
    await page.evaluate((s) => window.renderDish(s), spec);

    // Capture transparent PNG element screenshot
    const canvasHandle = await page.$('#c');
    if (canvasHandle) {
      await canvasHandle.screenshot({ path: pngPath, omitBackground: true });
    }
  }

  await browser.close();
  console.log('Successfully generated 100% photorealistic studio PNGs for all dishes!');
}

main().catch(console.error);
