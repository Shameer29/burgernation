import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/sauces');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const SAUCE_SPECS = [
  {
    id: 'og-classic',
    name: 'OG Classic',
    baseColor: '#F5F2EA',
    darkColor: '#DCD4C0',
    highlightColor: '#FFFFFF',
    splashColor: '#EBE5D8',
    garnish: 'chives',
    swirl: 'creamy',
    hot: false
  },
  {
    id: 'buffalo-sauce',
    name: 'Buffalo Sauce',
    baseColor: '#EE6410',
    darkColor: '#B84305',
    highlightColor: '#FF9548',
    splashColor: '#F56E15',
    garnish: 'none',
    swirl: 'glossy',
    hot: false
  },
  {
    id: 'buldak',
    name: 'Buldak',
    baseColor: '#9C1111',
    darkColor: '#5C0808',
    highlightColor: '#D92A2A',
    splashColor: '#BA1818',
    garnish: 'chili_seeds',
    swirl: 'spicy',
    hot: true
  },
  {
    id: 'korean-hot-honey',
    name: 'Korean Hot Honey',
    baseColor: '#C46B12',
    darkColor: '#7A3F07',
    highlightColor: '#F5A342',
    splashColor: '#D97716',
    garnish: 'honey_sheen',
    swirl: 'sticky',
    hot: false
  },
  {
    id: 'bulls-eye-bbq',
    name: 'Bulls Eye BBQ',
    baseColor: '#4A230C',
    darkColor: '#261105',
    highlightColor: '#7A401A',
    splashColor: '#592D12',
    garnish: 'sesame_seeds',
    swirl: 'smoky',
    hot: false
  },
  {
    id: 'nashville',
    name: 'Nashville',
    baseColor: '#D62818',
    darkColor: '#8C160B',
    highlightColor: '#FF5745',
    splashColor: '#E63422',
    garnish: 'cayenne_oil',
    swirl: 'spicy_oil',
    hot: true
  },
  {
    id: 'mango-habanero',
    name: 'Mango & Habanero',
    baseColor: '#F59E0B',
    darkColor: '#B46B04',
    highlightColor: '#FCD34D',
    splashColor: '#FBBF24',
    garnish: 'mango_specks',
    swirl: 'tropical',
    hot: true
  },
  {
    id: 'truffle-mayo',
    name: 'Truffle Mayo',
    baseColor: '#EBE0CE',
    darkColor: '#C7BAA3',
    highlightColor: '#FFFBF5',
    splashColor: '#E0D4C0',
    garnish: 'truffle_specks',
    swirl: 'creamy',
    hot: false
  },
  {
    id: 'chipotle',
    name: 'Chipotle',
    baseColor: '#B84E1A',
    darkColor: '#7A300E',
    highlightColor: '#D9733D',
    splashColor: '#C65A22',
    garnish: 'paprika_specks',
    swirl: 'smoky',
    hot: false
  },
  {
    id: 'lemon-herb',
    name: 'Lemon & Herb',
    baseColor: '#F3F5E4',
    darkColor: '#CCD2AA',
    highlightColor: '#FFFFFF',
    splashColor: '#E3E8C8',
    garnish: 'herbs_lemon',
    swirl: 'creamy',
    hot: false
  },
  {
    id: 'parmesan',
    name: 'Parmesan',
    baseColor: '#F2E8BE',
    darkColor: '#CABF92',
    highlightColor: '#FFFBF0',
    splashColor: '#EADFAD',
    garnish: 'parm_pepper',
    swirl: 'rich_creamy',
    hot: false
  }
];

async function generateAllSauceTubs() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 500, height: 500 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
        canvas { width: 400px; height: 400px; display: block; }
      </style>
    </head>
    <body>
      <canvas id="c" width="400" height="400"></canvas>
      <script>
        window.drawSauceTub = function(spec) {
          const c = document.getElementById('c');
          const ctx = c.getContext('2d');
          ctx.clearRect(0, 0, 400, 400);

          const centerX = 200;
          const centerY = 210;
          const tubRadiusX = 115;
          const tubRadiusY = 65;

          // 1. DYNAMIC SAUCE SPLASH / DRIPS IN BACKGROUND & SIDES
          ctx.save();
          // Splash droplets
          const dropletPositions = [
            { x: centerX - 130, y: centerY - 60, r: 12 },
            { x: centerX + 135, y: centerY - 50, r: 15 },
            { x: centerX + 145, y: centerY - 20, r: 8 },
            { x: centerX - 145, y: centerY - 10, r: 9 },
            { x: centerX - 100, y: centerY - 95, r: 10 },
            { x: centerX + 95, y: centerY - 105, r: 11 },
          ];

          dropletPositions.forEach(d => {
            // Splash glow
            const sGrad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 2);
            sGrad.addColorStop(0, spec.splashColor);
            sGrad.addColorStop(0.7, spec.baseColor);
            sGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = sGrad;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r * 2, 0, Math.PI * 2);
            ctx.fill();

            // Core droplet
            ctx.fillStyle = spec.baseColor;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();

            // Droplet highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(d.x - d.r * 0.3, d.y - d.r * 0.3, d.r * 0.3, 0, Math.PI * 2);
            ctx.fill();
          });

          // Dynamic splash arc / swoosh
          ctx.strokeStyle = spec.splashColor;
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(centerX, centerY - 10, tubRadiusX + 25, Math.PI * 1.1, Math.PI * 1.35);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(centerX, centerY - 10, tubRadiusX + 28, Math.PI * 1.7, Math.PI * 1.95);
          ctx.stroke();

          ctx.restore();

          // 2. TUB SHADOW UNDERNEATH
          ctx.save();
          const shadowGrad = ctx.createRadialGradient(centerX, centerY + 55, 10, centerX, centerY + 55, 130);
          shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
          shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.35)');
          shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = shadowGrad;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY + 55, 130, 40, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // 3. BLACK CERAMIC DIPPING TUB / RAMEKIN BODY (SIDE CYLINDER)
          ctx.save();
          const bodyGrad = ctx.createLinearGradient(centerX - tubRadiusX, centerY, centerX + tubRadiusX, centerY);
          bodyGrad.addColorStop(0, '#101114');
          bodyGrad.addColorStop(0.15, '#282A30');
          bodyGrad.addColorStop(0.5, '#191B20');
          bodyGrad.addColorStop(0.85, '#282A30');
          bodyGrad.addColorStop(1, '#0C0D10');

          ctx.fillStyle = bodyGrad;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, tubRadiusX, tubRadiusY, 0, 0, Math.PI);
          ctx.lineTo(centerX - tubRadiusX, centerY);
          ctx.fill();

          // Tub bottom curve
          ctx.beginPath();
          ctx.ellipse(centerX, centerY + 35, tubRadiusX - 4, tubRadiusY - 8, 0, 0, Math.PI);
          ctx.lineTo(centerX + tubRadiusX, centerY);
          ctx.lineTo(centerX - tubRadiusX, centerY);
          ctx.fill();

          // Subtle ribbed texture on ramekin outer wall
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 2;
          for (let x = centerX - tubRadiusX + 15; x < centerX + tubRadiusX - 15; x += 12) {
            ctx.beginPath();
            ctx.moveTo(x, centerY);
            ctx.lineTo(x, centerY + 30);
            ctx.stroke();
          }
          ctx.restore();

          // 4. BLACK RAMEKIN TOP RIM (OUTER & INNER EDGE)
          ctx.save();
          // Outer rim highlight
          ctx.strokeStyle = '#3E414B';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY - 2, tubRadiusX + 3, tubRadiusY + 3, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Inner rim shadow
          const innerRimGrad = ctx.createLinearGradient(centerX, centerY - tubRadiusY, centerX, centerY + tubRadiusY);
          innerRimGrad.addColorStop(0, '#0C0D10');
          innerRimGrad.addColorStop(1, '#2E323B');
          ctx.fillStyle = innerRimGrad;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY - 2, tubRadiusX, tubRadiusY, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // 5. THE DELICIOUS SAUCE SURFACE (3D FILL INSIDE TUB)
          ctx.save();
          const sauceRadiusX = tubRadiusX - 10;
          const sauceRadiusY = tubRadiusY - 8;
          const sauceY = centerY - 5;

          // Base sauce gradient
          const sauceGrad = ctx.createRadialGradient(centerX - 25, sauceY - 15, 10, centerX, sauceY, sauceRadiusX);
          sauceGrad.addColorStop(0, spec.highlightColor);
          sauceGrad.addColorStop(0.25, spec.baseColor);
          sauceGrad.addColorStop(0.75, spec.darkColor);
          sauceGrad.addColorStop(1, spec.darkColor);

          ctx.fillStyle = sauceGrad;
          ctx.beginPath();
          ctx.ellipse(centerX, sauceY, sauceRadiusX, sauceRadiusY, 0, 0, Math.PI * 2);
          ctx.fill();

          // 6. SAUCE SWIRLS AND TEXTURE SHADING
          ctx.strokeStyle = spec.highlightColor;
          ctx.lineWidth = 7;
          ctx.lineCap = 'round';
          ctx.globalAlpha = 0.35;
          ctx.beginPath();
          ctx.ellipse(centerX - 10, sauceY + 5, sauceRadiusX * 0.55, sauceRadiusY * 0.45, -0.3, 0, Math.PI * 1.5);
          ctx.stroke();

          ctx.strokeStyle = spec.darkColor;
          ctx.lineWidth = 5;
          ctx.globalAlpha = 0.45;
          ctx.beginPath();
          ctx.ellipse(centerX + 15, sauceY - 5, sauceRadiusX * 0.65, sauceRadiusY * 0.55, 0.4, 0, Math.PI * 1.3);
          ctx.stroke();
          ctx.globalAlpha = 1.0;

          // Glossy specular highlight reflection on sauce
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.beginPath();
          ctx.ellipse(centerX - 35, sauceY - 18, 28, 9, -0.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.ellipse(centerX + 40, sauceY + 18, 18, 6, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // 7. SPECIFIC GARNISHES AND DETAIL SPECKS (Chives, Sesame seeds, Chili flakes, Truffle specks, etc.)
          ctx.save();
          if (spec.garnish === 'chives') {
            // Sprinkled chopped green chives
            const chiveColors = ['#2E7D32', '#388E3C', '#4CAF50', '#1B5E20'];
            for (let i = 0; i < 28; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 25);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.strokeStyle = chiveColors[i % 4];
              ctx.lineWidth = 3.5;
              ctx.lineCap = 'round';
              ctx.beginPath();
              ctx.moveTo(px - 4, py - 2);
              ctx.lineTo(px + 4, py + 2);
              ctx.stroke();
            }
          } else if (spec.garnish === 'sesame_seeds') {
            // Sprinkled white/golden sesame seeds
            const seedColors = ['#FFFBEB', '#FEF3C7', '#FDE68A', '#F3F4F6'];
            for (let i = 0; i < 35; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 20);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.fillStyle = seedColors[i % 4];
              ctx.beginPath();
              ctx.ellipse(px, py, 4, 2, Math.random() * Math.PI, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (spec.garnish === 'chili_seeds') {
            // Spicy chili flakes & seeds for Buldak
            for (let i = 0; i < 30; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 20);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.fillStyle = i % 3 === 0 ? '#FEF08A' : '#450A0A'; // chili seeds vs roasted flakes
              ctx.beginPath();
              ctx.ellipse(px, py, i % 3 === 0 ? 3 : 4, 2, Math.random() * Math.PI, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (spec.garnish === 'truffle_specks') {
            // Gourmet black truffle bits
            ctx.fillStyle = '#181512';
            for (let i = 0; i < 40; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 18);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.beginPath();
              ctx.arc(px, py, 1 + Math.random() * 2, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (spec.garnish === 'herbs_lemon') {
            // Parsley herbs and golden lemon zest specks
            for (let i = 0; i < 32; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 20);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.fillStyle = i % 2 === 0 ? '#15803D' : '#FACC15';
              ctx.beginPath();
              ctx.arc(px, py, 1.5 + Math.random() * 2, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (spec.garnish === 'parm_pepper') {
            // Grated parmesan flakes & cracked black pepper
            for (let i = 0; i < 35; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 22);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.fillStyle = i % 3 === 0 ? '#27272A' : '#FEF9C3';
              ctx.beginPath();
              ctx.ellipse(px, py, i % 3 === 0 ? 2 : 4, 2, Math.random() * Math.PI, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (spec.garnish === 'mango_specks') {
            // Tropical habanero chili specks
            for (let i = 0; i < 25; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 20);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.fillStyle = '#9A3412';
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (spec.garnish === 'paprika_specks') {
            // Chipotle smoky paprika flakes
            for (let i = 0; i < 28; i++) {
              const ang = Math.random() * Math.PI * 2;
              const rad = Math.sqrt(Math.random()) * (sauceRadiusX - 20);
              const px = centerX + Math.cos(ang) * rad;
              const py = sauceY + Math.sin(ang) * rad * 0.55;
              ctx.fillStyle = '#431407';
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        };
      </script>
    </body>
    </html>
  `);

  for (const spec of SAUCES_SPECS_DATA) {
    console.log(`Generating sauce tub image: ${spec.name} (${spec.id}.png)...`);
    await page.evaluate((s) => window.drawSauceTub(s), spec);
    const canvasElement = await page.$('#c');
    const filePath = path.join(outputDir, `${spec.id}.png`);
    await canvasElement.screenshot({ path: filePath, omitBackground: true });
  }

  await browser.close();
  console.log('All 11 sauce tub images generated successfully!');
}

const SAUCES_SPECS_DATA = SAUCE_SPECS;
generateAllSauceTubs().catch(console.error);
