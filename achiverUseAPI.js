const puppeteer = require('puppeteer');

async function getNewPageWhenLoaded(browser) {
  return new Promise((resolve) => {
      const listener = (target) => {
      if (target.type() === 'page') {
          browser.removeListener('targetcreated', listener);
          resolve(target.page());
          }
      };
      browser.on('targetcreated', listener);
  });
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
    await page.goto('https://itl.archiverservice.com');
    await page.type('#textInput','18882064040');
    await page.type('#password','Test!123');
    await page.click('button[class="btn btn-primary"]');

    await page.waitForSelector('img[role="img"]', {visible:true, timeout:60*1000});

    await page.click('button[aria-label="Dropbox Connect"]');

    await page.waitFor(3000);
    const newPage = await getNewPageWhenLoaded(browser);

    await newPage.waitForSelector('input[type="email"]');

    await newPage.type('input[type="email"]','dropbox5@fineplace.cn');
    await newPage.type('input[type="password"]','Test!123');

})();