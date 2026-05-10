import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  console.log('Loading /contact/contributing/formats ...');
  await page.goto('http://localhost:5173/contact/contributing/formats', { waitUntil: 'networkidle', timeout: 30000 });

  const totalCallouts = await page.locator('.callout').count();
  console.log(`Total .callout elements: ${totalCallouts}`);

  // 检查各类型数量
  for (const type of ['warning', 'example', 'note', 'info', 'tip', 'danger']) {
    const count = await page.locator(`.callout[data-callout="${type}"]`).count();
    if (count > 0) console.log(`  ${type}: ${count}`);
  }

  // 检查第一个 warning callout 的样式（用 first 精确定位）
  const w = page.locator('.callout[data-callout="warning"]').first();
  const bgColor = await w.evaluate(el => window.getComputedStyle(el).backgroundColor);
  console.log(`\nFirst warning callout background: ${bgColor}`);

  // 检查 SVG 图标
  const svgCount = await page.locator('.callout-title-icon svg').count();
  console.log(`SVG icons found: ${svgCount}`);

  // 检查折叠
  const foldCount = await page.locator('details.callout').count();
  console.log(`Foldable callouts (details): ${foldCount}`);

  const ssPath = 'C:\\Users\\56506\\AppData\\Local\\Temp\\callout-test-formats.png';
  await page.screenshot({ path: ssPath, fullPage: true });
  console.log(`Screenshot: ${ssPath}`);

  if (errors.length) { console.log(`\nERRORS (${errors.length}):`); errors.forEach(e => console.log(`  - ${e}`)); }
  else console.log('\nNO ERRORS');

  await browser.close();
})();
