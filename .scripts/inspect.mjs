import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5175', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.mouse.wheel(0, 540);
await page.waitForTimeout(500);
const info = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('h3')).filter(h => h.textContent.includes('Pickle'));
  return els.map(el => {
    const box = el.closest('div[style]');
    const r = el.getBoundingClientRect();
    const br = box ? box.getBoundingClientRect() : null;
    return { text: el.textContent, rect: r, boxRect: br, computedFont: getComputedStyle(el).fontFamily };
  });
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
