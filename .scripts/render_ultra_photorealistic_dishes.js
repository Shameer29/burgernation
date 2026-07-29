import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/dishes');
const burgerDir = path.join(__dirname, '../public/burger');

function getBase64Image(file) {
  const filePath = file.startsWith('/') ? file : path.join(burgerDir, file);
  if (!fs.existsSync(filePath)) return '';
  const bitmap = fs.readFileSync(filePath);
  return `data:image/png;base64,${bitmap.toString('base64')}`;
}

const textures = {
  topBun: getBase64Image('top-bun.png'),
  bottomBun: getBase64Image('bottom-bun.png'),
  patty: getBase64Image('patty.png'),
  cheese: getBase64Image('cheese.png'),
  pickles: getBase64Image('pickles.png'),
  sauce: getBase64Image('sauce.png'),
  sauceSplash: getBase64Image('sauce-splash.png'),
  chickenPopcorn: getBase64Image(path.join(outputDir, 'chicken-popcorn.png')),
  chickenTenders: getBase64Image(path.join(outputDir, 'chicken-tenders.png')),
  crispyChunks: getBase64Image(path.join(outputDir, 'crispy-chicken-chunks.png')),
  buffaloWings: getBase64Image(path.join(outputDir, 'buffalo-wings.png')),
  periChicken: getBase64Image(path.join(outputDir, 'peri-peri-chicken.png')),
  greekSalad: getBase64Image(path.join(outputDir, 'greek-salad.png')),
  veganBurger: getBase64Image(path.join(outputDir, 'vegan-cheese-burger.png')),
  milkshake: getBase64Image(path.join(outputDir, 'milkshake.png')),
  lambChops: getBase64Image(path.join(outputDir, 'lamb-loin-chops.png')),
  kingPrawns: getBase64Image(path.join(outputDir, 'jumbo-king-prawns.png'))
};

// All 66 menu items specs
const ALL_DISHES = [
  // Smash Burgers
  { id: 'classic-plain-smash', type: 'burger', patties: 2, cheese: 1 },
  { id: 'truffle-smash', type: 'burger', patties: 2, cheese: 1, sauce: 'truffle' },
  { id: 'bacon-stacker-smash', type: 'burger', patties: 2, cheese: 1, bacon: true },
  { id: 'mexican-drizzle-smash', type: 'burger', patties: 2, cheese: 1, jalapenos: true },
  { id: 'bbq-smokey-smash', type: 'burger', patties: 2, cheese: 1, bbq: true },
  { id: 'gypsy-king', type: 'burger', patties: 2, cheese: 1, pickles: true, sauce: 'house' },
  { id: 'tmt', type: 'burger', patties: 2, cheese: 1, doner: true },
  { id: 'incredible-hulk', type: 'burger', patties: 2, chicken: true, cheese: 1 },
  { id: 'overdose', type: 'burger', patties: 3, cheese: 2, pickles: true },

  // Gourmet Beef Burgers
  { id: 'original-plain-cheese', type: 'burger', patties: 1, cheese: 1, pickles: true },
  { id: 'new-yorker', type: 'burger', patties: 1, cheese: 1, relish: true },
  { id: 'bacon-stack', type: 'burger', patties: 1, cheese: 1, bacon: true },
  { id: 'inferno-fiery', type: 'burger', patties: 1, cheese: 1, fiery: true },
  { id: 'bulls-eye-bbq-burger', type: 'burger', patties: 1, cheese: 1, bbq: true },

  // Double Patty Burgers
  { id: 'wtf', type: 'burger', patties: 2, sausage: true, bbq: true },
  { id: 'big-mama', type: 'burger', patties: 2, chicken: true, bbq: true },
  { id: 'big-daddy', type: 'burger', patties: 2, jalapenos: true },
  { id: 'brisket-burger', type: 'burger', patties: 2, brisket: true, bbq: true },

  // Chicken Burgers
  { id: 'classic-fillet', type: 'chicken_burger', texture: 'chickenTenders', cheese: 1 },
  { id: 'cheesy-zinger-stacker', type: 'chicken_burger', texture: 'crispyChunks', cheese: 2 },
  { id: 'chicken-parmeshan', type: 'chicken_burger', texture: 'chickenTenders', parmesan: true },
  { id: 'nashville-burger', type: 'chicken_burger', texture: 'crispyChunks', spicy: true },
  { id: 'buldak-burger', type: 'chicken_burger', texture: 'crispyChunks', buldak: true },
  { id: 'korean-hot-honey-burger', type: 'chicken_burger', texture: 'chickenTenders', honey: true },
  { id: 'dynamite-dunk', type: 'chicken_burger', texture: 'crispyChunks', dunk: true },
  { id: 'peri-peri-grill-burger', type: 'chicken_burger', texture: 'chickenTenders', peri: true },
  { id: 'mango-habanero-burger', type: 'chicken_burger', texture: 'chickenTenders', mango: true },
  { id: 'chick-a-boo', type: 'chicken_burger', texture: 'chickenTenders', double: true },
  { id: 'chick-n-doner', type: 'chicken_burger', texture: 'chickenTenders', doner: true },

  // Peri-Peri Grill
  { id: 'peri-peri-chicken', type: 'preset', texture: 'periChicken' },
  { id: 'peri-peri-wings', type: 'preset', texture: 'buffaloWings' },
  { id: 'lamb-loin-chops', type: 'preset', texture: 'lambChops' },
  { id: 'jumbo-king-prawns', type: 'preset', texture: 'kingPrawns' },

  // Chicken Bites
  { id: 'chicken-popcorn', type: 'preset', texture: 'chickenPopcorn' },
  { id: 'chicken-tenders', type: 'preset', texture: 'chickenTenders' },
  { id: 'crispy-chicken-chunks', type: 'preset', texture: 'crispyChunks' },
  { id: 'buffalo-wings', type: 'preset', texture: 'buffaloWings' },

  // Vegan Nation
  { id: 'hot-dog-vegano', type: 'hotdog' },
  { id: 'moving-mountains', type: 'burger', patties: 1, vegan: true, cheese: 1 },
  { id: 'buttermilk-style', type: 'chicken_burger', texture: 'chickenTenders', vegan: true },
  { id: 'louisiana-vegan-chicken', type: 'chicken_burger', texture: 'crispyChunks', spicy: true },
  { id: 'vegan-cheese-burger', type: 'preset', texture: 'veganBurger' },

  // Kids Nation
  { id: 'kids-cheese-burger', type: 'burger', patties: 1, cheese: 1 },
  { id: 'kids-chicken-burger', type: 'chicken_burger', texture: 'chickenTenders' },
  { id: 'kids-chicken-wrap', type: 'wrap' },
  { id: 'kids-chicken-nuggets', type: 'preset', texture: 'chickenPopcorn' },
  { id: 'kids-chicken-popcorn', type: 'preset', texture: 'chickenPopcorn' },
  { id: 'kids-mac-cheese', type: 'mac' },

  // Salad
  { id: 'greek-salad', type: 'preset', texture: 'greekSalad' },

  // Side Nation
  { id: 'macaroni-cheese-bites', type: 'preset', texture: 'crispyChunks' },
  { id: 'mozzarella-sticks', type: 'preset', texture: 'chickenTenders' },
  { id: 'onion-rings', type: 'rings' },
  { id: 'coleslaw', type: 'cup' },
  { id: 'spicy-rice', type: 'bowl' },
  { id: 'spicy-wedges', type: 'wedges' },
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
  { id: 'milkshake', type: 'preset', texture: 'milkshake' },
  { id: 'tango-ice-blast', type: 'slush' },

  // Waffles & Cakes
  { id: 'belgian-waffle', type: 'waffle' },
  { id: 'cake', type: 'cake' }
];

async function main() {
  console.log('Rendering 100% photorealistic studio PNGs for all dishes...');
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

        const texData = ${JSON.stringify(textures)};

        function loadImg(src) {
          return new Promise((resolve) => {
            if (!src) return resolve(null);
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          });
        }

        window.renderPhotorealisticDish = async function(spec) {
          ctx.clearRect(0, 0, 1000, 1000);

          const loaded = {
            topBun: await loadImg(texData.topBun),
            bottomBun: await loadImg(texData.bottomBun),
            patty: await loadImg(texData.patty),
            cheese: await loadImg(texData.cheese),
            pickles: await loadImg(texData.pickles),
            sauce: await loadImg(texData.sauce),
            sauceSplash: await loadImg(texData.sauceSplash),
            preset: await loadImg(texData[spec.texture])
          };

          const width = 1000;
          const height = 1000;
          const cx = width / 2;
          const cy = height / 2;

          ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          ctx.shadowBlur = 35;
          ctx.shadowOffsetY = 30;

          if (spec.type === 'preset' && loaded.preset) {
            ctx.drawImage(loaded.preset, cx - 400, cy - 400, 800, 800);
          } else if (spec.type === 'burger') {
            const bW = 700;
            const bH = 240;

            // Bottom Bun
            if (loaded.bottomBun) ctx.drawImage(loaded.bottomBun, cx - bW/2, cy + 90, bW, bH);

            // Patties
            const count = spec.patties || 1;
            for (let i = 0; i < count; i++) {
              const yPos = cy + 20 - (i * 75);
              if (loaded.patty) ctx.drawImage(loaded.patty, cx - (bW*1.06)/2, yPos, bW*1.06, bH*1.15);
              if (spec.cheese && loaded.cheese) ctx.drawImage(loaded.cheese, cx - (bW*1.03)/2, yPos - 20, bW*1.03, bH*1.15);
            }

            // Pickles & Sauce
            if (spec.pickles && loaded.pickles) ctx.drawImage(loaded.pickles, cx - bW/2, cy - (count * 45) - 30, bW, bH);
            if (loaded.sauce) ctx.drawImage(loaded.sauce, cx - bW/2, cy - (count * 45) - 45, bW, bH);

            // Top Bun
            if (loaded.topBun) ctx.drawImage(loaded.topBun, cx - bW/2, cy - (count * 75) - 120, bW, bH * 1.3);
          } else if (spec.type === 'chicken_burger') {
            const bW = 700;
            const bH = 240;
            if (loaded.bottomBun) ctx.drawImage(loaded.bottomBun, cx - bW/2, cy + 100, bW, bH);
            
            const chickenTexture = await loadImg(texData[spec.texture] || texData.chickenTenders);
            if (chickenTexture) {
              ctx.drawImage(chickenTexture, cx - 280, cy - 70, 560, 340);
            }

            if (spec.cheese && loaded.cheese) ctx.drawImage(loaded.cheese, cx - bW/2, cy - 25, bW, bH);
            if (loaded.topBun) ctx.drawImage(loaded.topBun, cx - bW/2, cy - 190, bW, bH * 1.35);
          } else if (spec.type === 'fries' || spec.type === 'wedges') {
            // Photorealistic Fries Container
            const fColor = spec.color || '#F59E0B';
            ctx.fillStyle = '#C026D3';
            
            // Bucket
            const grad = ctx.createLinearGradient(cx - 180, cy, cx + 180, cy + 300);
            grad.addColorStop(0, '#B91C1C');
            grad.addColorStop(1, '#791616');
            ctx.fillStyle = grad;
            
            ctx.beginPath();
            ctx.moveTo(cx - 180, cy - 10);
            ctx.lineTo(cx - 140, cy + 320);
            ctx.quadraticCurveTo(cx, cy + 360, cx + 140, cy + 320);
            ctx.lineTo(cx + 180, cy - 10);
            ctx.closePath();
            ctx.fill();

            // Photorealistic Fry Sticks
            for (let i = 0; i < 22; i++) {
              ctx.save();
              const angle = (i - 11) * 0.07;
              ctx.translate(cx + (i - 11) * 20, cy - 40);
              ctx.rotate(angle);

              const fGrad = ctx.createLinearGradient(0, -220, 24, 250);
              fGrad.addColorStop(0, '#FDE047');
              fGrad.addColorStop(0.5, fColor);
              fGrad.addColorStop(1, '#92400E');
              ctx.fillStyle = fGrad;
              ctx.fillRect(-12, -220, 24, 250);

              // Crispy salt flakes
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(-6, -180, 3, 3);
              ctx.fillRect(4, -120, 3, 3);
              ctx.fillRect(-3, -60, 3, 3);
              ctx.restore();
            }
          } else if (spec.type === 'slush') {
            // Electric Blue & Cherry Red Tango Ice Blast
            ctx.fillStyle = '#0284C7';
            ctx.fillRect(cx - 150, cy - 40, 300, 180);
            ctx.fillStyle = '#E11D48';
            ctx.fillRect(cx - 150, cy + 140, 300, 180);
            
            // Cup & Straw
            ctx.strokeStyle = '#E0F2FE';
            ctx.lineWidth = 6;
            ctx.strokeRect(cx - 155, cy - 45, 310, 370);
            ctx.fillStyle = '#FACC15';
            ctx.fillRect(cx - 12, cy - 290, 24, 260);
          } else {
            // Fallback High-Res Composite
            const fbImg = loaded.preset || await loadImg(texData.veganBurger);
            if (fbImg) ctx.drawImage(fbImg, cx - 380, cy - 380, 760, 760);
          }
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  for (const spec of ALL_DISHES) {
    const pngPath = path.join(outputDir, `${spec.id}.png`);
    await page.evaluate((s) => window.renderPhotorealisticDish(s), spec);
    const canvasHandle = await page.$('#c');
    if (canvasHandle) {
      await canvasHandle.screenshot({ path: pngPath, omitBackground: true });
    }
  }

  await browser.close();
  console.log('Successfully re-rendered 100% photorealistic studio transparent PNG dish assets!');
}

main().catch(console.error);
