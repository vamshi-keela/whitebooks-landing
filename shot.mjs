import { chromium } from 'playwright';

const browser = await chromium.launch();
for (const [theme, name] of [['dark','dark'],['light','light']]) {
  for (const [w,h,tag] of [[1440,1200,'desktop'],[390,1400,'mobile']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('http://localhost:5176/');
    if (theme === 'light') {
      await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); localStorage.setItem('theme','light'); });
      await page.reload();
    }
    const el = await page.locator('text=Already on SAP or Tally').first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `/tmp/connectors-${name}-${tag}.png` });
    await page.close();
  }
}
await browser.close();
console.log('done');
