import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5175', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/shot-1-hero.png' });

// scroll into the pinned hero timeline - explode phase
await page.mouse.wheel(0, window_h(0.6));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/shot-2-explode.png' });

await page.mouse.wheel(0, window_h(2.2));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/shot-3-exit.png' });

await page.mouse.wheel(0, window_h(6));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/shot-4-menu.png', fullPage: false });

// hover a menu card to trigger spin
const card = page.locator('article').first();
await card.scrollIntoViewIfNeeded();
await card.hover();
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/shot-5-card-hover.png' });

await page.mouse.wheel(0, window_h(10));
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/shot-6-footer.png' });

console.log('console/page errors:', JSON.stringify(errors));
await browser.close();
console.log('done');

function window_h(mult) { return Math.round(900 * mult); }
