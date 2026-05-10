import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/contact/contributing/formats', { waitUntil: 'networkidle', timeout: 30000 });

  // 检查自定义 CSS 是否加载
  const hasCustomCSS = await page.evaluate(() => {
    const sheets = [...document.styleSheets];
    return sheets.some(s => s.href && s.href.includes('custom'));
  });
  console.log(`custom.css loaded: ${hasCustomCSS}`);

  // 检查 callout 变量是否生效
  const w = page.locator('.callout[data-callout="warning"]').first();
  const computed = await w.evaluate(el => {
    const s = window.getComputedStyle(el);
    return {
      bg: s.backgroundColor,
      border: s.border,
      borderRadius: s.borderRadius,
      padding: s.padding,
      calloutColor: s.getPropertyValue('--callout-color').trim(),
    };
  });
  console.log('Warning callout computed:');
  console.log(`  --callout-color: "${computed.calloutColor}"`);
  console.log(`  background: ${computed.bg}`);
  console.log(`  border: ${computed.border}`);
  console.log(`  border-radius: ${computed.borderRadius}`);

  // 检查 :root 中的 --callout-warning 变量
  const rootWarning = await page.evaluate(() => {
    return window.getComputedStyle(document.documentElement).getPropertyValue('--callout-warning').trim();
  });
  console.log(`\n--callout-warning on :root: "${rootWarning}"`);

  await browser.close();
})();
