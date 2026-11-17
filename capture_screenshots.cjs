const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const DIST_DIR = path.join(__dirname, 'dist');
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const PORT = 4173;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 1. Static file server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Fallback to index.html for SPA
    const indexPath = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);

    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

    try {
      // 1. Homepage Hero & Brand Bar
      console.log('Capturing 01-ecommerce-homepage-hero.png...');
      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
      await page.waitForTimeout ? page.waitForTimeout(1000) : new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '01-ecommerce-homepage-hero.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 2. New Arrivals & Top Selling
      console.log('Capturing 02-new-arrivals-and-top-selling.png...');
      await page.evaluate(() => window.scrollTo(0, 750));
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '02-new-arrivals-and-top-selling.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 3. Browse Dress Style & Testimonials
      console.log('Capturing 03-browse-dress-style-categories.png...');
      await page.evaluate(() => window.scrollTo(0, 1950));
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '03-browse-dress-style-categories.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 4. Category Catalog with Filters
      console.log('Capturing 04-category-catalog-with-filters.png...');
      await page.evaluate(() => window.scrollTo(0, 0));
      // Click 'Casual' or 'Shop' link or View All button
      const viewAllBtn = await page.$('button::-p-text(View All)');
      if (viewAllBtn) {
        await viewAllBtn.click();
      } else {
        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Shop'));
          if (btn) btn.click();
        });
      }
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '04-category-catalog-with-filters.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 5. Product Detail Page (PDP)
      console.log('Capturing 05-product-detail-page-pdp.png...');
      await page.evaluate(() => {
        const item = document.querySelector('main .group h3') || document.querySelector('main .group img');
        if (item) item.click();
      });
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '05-product-detail-page-pdp.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 6. Shopping Cart & Order Summary
      console.log('Capturing 06-shopping-cart-order-summary.png...');
      // Click Add to Cart
      await page.evaluate(() => {
        const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Add to Cart'));
        if (addBtn) addBtn.click();
      });
      await new Promise(r => setTimeout(r, 600));

      // Click Cart Icon in Navbar
      await page.evaluate(() => {
        const cartBtn = document.querySelector('header button[aria-label="Cart"]') ||
          Array.from(document.querySelectorAll('header button')).find(b => b.innerHTML.includes('ShoppingBag') || b.querySelector('svg'));
        // Find cart button by looking for onOpenCart
        const headerButtons = Array.from(document.querySelectorAll('header button'));
        if (headerButtons[3]) headerButtons[3].click();
      });
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '06-shopping-cart-order-summary.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 7. Checkout & Invoice Confirmation
      console.log('Capturing 07-checkout-invoice-confirmation.png...');
      await page.evaluate(() => {
        const checkoutBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Go to Checkout'));
        if (checkoutBtn) checkoutBtn.click();
      });
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '07-checkout-invoice-confirmation.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      // 8. Customer Reviews & Newsletter
      console.log('Capturing 08-customer-reviews-and-newsletter.png...');
      // Close checkout modal & navigate home
      await page.evaluate(() => {
        const closeBtn = document.querySelector('.fixed.inset-0 button');
        if (closeBtn) closeBtn.click();
        const homeLogo = document.querySelector('header span');
        if (homeLogo) homeLogo.click();
      });
      await new Promise(r => setTimeout(r, 800));
      await page.evaluate(() => window.scrollTo(0, 2600));
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '08-customer-reviews-and-newsletter.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });

      console.log('All 8 screenshots successfully captured!');
    } catch (err) {
      console.error('Screenshot capture error:', err);
    } finally {
      await browser.close();
      server.close();
      process.exit(0);
    }
  });
}

run();
