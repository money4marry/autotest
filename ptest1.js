/**
 * Created by Young on 2017/9/16.
 */
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        slowMo: 250
    });
    const page = await browser.newPage();
    page.setViewport({width: 1080, height: 720});
    await page.goto('https://www.baidu.com');
    // await page.screenshot({path: 'example.png'});
    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);

    page.on('console', (...args) => console.log('PAGE LOG:', ...args));
    await page.evaluate(() => console.log(`url is ${location.href}`));

    await browser.close();
})();