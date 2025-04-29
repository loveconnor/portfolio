const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');
const { chromium } = require('playwright'); // Replacing Puppeteer with Playwright

export async function generateOgImage(props) {
  const params = new URLSearchParams(props);
  const url = `file:${path.join(
    process.cwd(),
    `src/pages/articles/og-image.html?${params}`
  )}`;

  const hash = createHash('md5').update(url).digest('hex');
  const ogImageDir = path.join(process.cwd(), `public/og`);
  const imageName = `${hash}.png`;
  const imagePath = `${ogImageDir}/${imageName}`;
  const publicPath = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/${imageName}`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // File does not exist, so we create it
  }

  // Use Playwright to create the screenshot
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: 'networkidle' });
  const buffer = await page.screenshot();
  await browser.close();

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
}
