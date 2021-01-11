const puppeteer = require('puppeteer');

function shot({ url, selector = false, format = 'png' }) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox'],
        });

        const page = await browser.newPage();

        await page.goto(url, {
          waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
        });

        await page.waitForTimeout(1000);

        await page.emulateMediaType('screen');

        let buffer;
        if (selector) {
          await page.waitForSelector(selector);
          const element = await page.$(selector);
          buffer = await element.screenshot({
            type: format,
          });
        } else {
          buffer = await page.screenshot({
            fullPage: true,
            type: format,
          });
        }

        await browser.close();

        resolve(buffer);
      } catch (err) {
        reject(err);
      }
    })();
  });
}

function pdf({ url, width = false, height = false }) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox'],
        });

        const page = await browser.newPage();
        if (width && height) {
          await page.setViewport({ width, height });
        }

        await page.goto(url, {
          waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
        });

        await page.waitForTimeout(1000);

        await page.emulateMediaType('print');

        const pdf = await page.pdf({
          format: 'A4',
          format: 'A4',
          printBackground: true,
        });
        await browser.close();

        resolve(pdf);
      } catch (err) {
        reject(err);
      }
    })();
  });
}

module.exports = { shot, pdf };
