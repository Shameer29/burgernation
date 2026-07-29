import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dishesDir = path.join(__dirname, '../public/dishes');
const burgerDir = path.join(__dirname, '../public/burger');

function getAllPngFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.png'))
    .map(f => path.join(dir, f));
}

const allPngPaths = [
  ...getAllPngFiles(dishesDir),
  ...getAllPngFiles(burgerDir)
];

console.log(`Analyzing ${allPngPaths.length} PNG images for painted checkerboard grid patterns...`);

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 3000, height: 3000 } });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="c"></canvas>
      <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');

        window.stripCheckerboard = function(dataUrl) {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const w = img.width;
              const h = img.height;
              canvas.width = w;
              canvas.height = h;
              ctx.clearRect(0, 0, w, h);
              ctx.drawImage(img, 0, 0);

              const imgData = ctx.getImageData(0, 0, w, h);
              const data = imgData.data;

              // Helper to check if a pixel is neutral grey/white (checkerboard square color)
              function isNeutralGrid(r, g, b) {
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const isGreyOrWhite = (max - min) < 18 && min > 150;
                return isGreyOrWhite;
              }

              // Flood fill starting from all 4 borders to remove connected checkerboard tiles
              const visited = new Uint8Array(w * h);
              const queue = [];

              // Add all border pixels to queue if they are neutral grid colors
              for (let x = 0; x < w; x++) {
                queue.push(x, 0);
                queue.push(x, h - 1);
              }
              for (let y = 0; y < h; y++) {
                queue.push(0, y);
                queue.push(w - 1, y);
              }

              let head = 0;
              while (head < queue.length) {
                const x = queue[head++];
                const y = queue[head++];
                const idx = y * w + x;

                if (visited[idx]) continue;
                visited[idx] = 1;

                const pIdx = idx * 4;
                const r = data[pIdx];
                const g = data[pIdx + 1];
                const b = data[pIdx + 2];
                const a = data[pIdx + 3];

                if (a === 0) continue;

                if (isNeutralGrid(r, g, b)) {
                  // Make transparent
                  data[pIdx + 3] = 0;

                  // Add 4-way neighbors
                  if (x > 0) queue.push(x - 1, y);
                  if (x < w - 1) queue.push(x + 1, y);
                  if (y > 0) queue.push(x, y - 1);
                  if (y < h - 1) queue.push(x, y + 1);
                }
              }

              // Secondary pass: clear any remaining isolated neutral grey/white background pixels outside food center
              for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                  // Only check outer margins (outside center 60% box)
                  if (x < w * 0.12 || x > w * 0.88 || y < h * 0.12 || y > h * 0.88) {
                    const idx = (y * w + x) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];
                    if (isNeutralGrid(r, g, b)) {
                      data[idx + 3] = 0;
                    }
                  }
                }
              }

              ctx.putImageData(imgData, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            };
            img.src = dataUrl;
          });
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  let count = 0;
  for (const filePath of allPngPaths) {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = `data:image/png;base64,${fileBuffer.toString('base64')}`;

    const cleanedBase64 = await page.evaluate((d) => window.stripCheckerboard(d), base64Data);
    
    const base64Image = cleanedBase64.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Image, 'base64'));

    count++;
  }

  await browser.close();
  console.log(`Successfully removed checkerboard grid patterns from all ${count} PNG images!`);
}

main().catch(console.error);
