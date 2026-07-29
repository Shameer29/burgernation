import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenshotPath = '/Users/shami/Downloads/Screenshot 2026-07-28 at 10.38.43 pm.png';
const outputLogoPath = path.join(__dirname, '../public/logo.png');

async function main() {
  console.log('Extracting BURGER NATION logo from screenshot...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 2500 } });

  const fileBuffer = fs.readFileSync(screenshotPath);
  const base64Data = `data:image/png;base64,${fileBuffer.toString('base64')}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; background:transparent;">
      <canvas id="c"></canvas>
      <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');

        window.extractLogo = function(src) {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const w = img.width;
              const h = img.height;
              
              // Temporary canvas to find logo bounding box
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = w;
              tempCanvas.height = h;
              const tempCtx = tempCanvas.getContext('2d');
              tempCtx.drawImage(img, 0, 0);

              const fullData = tempCtx.getImageData(0, 0, w, h).data;

              // Find bounding box of gold logo pixels (gold color: high red/green, lower blue)
              let minX = w, maxX = 0, minY = h, maxY = 0;

              for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                  const idx = (y * w + x) * 4;
                  const r = fullData[idx];
                  const g = fullData[idx + 1];
                  const b = fullData[idx + 2];

                  // Gold color detection: golden hue with r > 100, g > 80
                  if (r > 100 && g > 80 && (r - b) > 30) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                  }
                }
              }

              // Add padding to crop box
              const padX = 40;
              const padY = 30;
              minX = Math.max(0, minX - padX);
              maxX = Math.min(w, maxX + padX);
              minY = Math.max(0, minY - padY);
              maxY = Math.min(h, maxY + padY);

              const cropW = maxX - minX;
              const cropH = maxY - minY;

              canvas.width = cropW;
              canvas.height = cropH;
              ctx.clearRect(0, 0, cropW, cropH);

              // Draw cropped logo region
              ctx.drawImage(img, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

              // Extract image data to remove black background
              const imgData = ctx.getImageData(0, 0, cropW, cropH);
              const data = imgData.data;

              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Calculate brightness
                const brightness = (r + g + b) / 3;

                // Black background removal
                if (r < 45 && g < 45 && b < 45) {
                  data[i + 3] = 0; // 100% transparent
                } else if (brightness < 70) {
                  // Feather edges
                  const alphaRatio = (brightness - 45) / 25;
                  data[i + 3] = Math.floor(255 * Math.max(0, Math.min(1, alphaRatio)));
                }
              }

              ctx.putImageData(imgData, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            };
            img.src = src;
          });
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  const logoBase64 = await page.evaluate((src) => window.extractLogo(src), base64Data);
  const base64Image = logoBase64.replace(/^data:image\/png;base64,/, '');

  fs.writeFileSync(outputLogoPath, Buffer.from(base64Image, 'base64'));
  console.log('BURGER NATION logo successfully extracted and saved to public/logo.png!');

  await browser.close();
}

main().catch(console.error);
