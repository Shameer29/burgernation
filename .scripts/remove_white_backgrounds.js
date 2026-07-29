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

console.log(`Found ${allPngPaths.length} PNG files to check and strip white backgrounds.`);

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1500 } });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="c"></canvas>
      <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');

        window.processImage = function(dataUrl) {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.clearRect(0, 0, img.width, img.height);
              ctx.drawImage(img, 0, 0);

              const imgData = ctx.getImageData(0, 0, img.width, img.height);
              const data = imgData.data;

              // Flood fill white background from corners or global white pixel keying
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // If pixel is pure or near white, remove background
                if (r > 225 && g > 225 && b > 225) {
                  const brightness = (r + g + b) / 3;
                  if (brightness >= 245) {
                    data[i + 3] = 0; // 100% transparent
                  } else {
                    // Anti-aliased edge smoothing
                    const alphaRatio = (245 - brightness) / 20;
                    data[i + 3] = Math.floor(data[i + 3] * Math.max(0, Math.min(1, alphaRatio)));
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

  let processedCount = 0;
  for (const filePath of allPngPaths) {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = `data:image/png;base64,${fileBuffer.toString('base64')}`;

    const newBase64 = await page.evaluate((d) => window.processImage(d), base64Data);
    
    // Save updated transparent PNG
    const base64Image = newBase64.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Image, 'base64'));

    processedCount++;
  }

  await browser.close();
  console.log(`Successfully removed white background from all ${processedCount} PNG images!`);
}

main().catch(console.error);
