const puppeteer = require('puppeteer');
const co = require('co');

var test = function*() {
    const browser = yield puppeteer.launch({
        headless: false,
        // executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        slowMo: 200
    });
    const page = yield browser.newPage();
    page.setViewport({width: 1366, height: 768});
    yield page.goto('https://www.baidu.com');

    yield page.screenshot({path: 'screenshot.png'});
    yield browser.close();
};
var perm = function*() {
    const browser = yield puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    const page = yield browser.newPage();
    page.setViewport({width: 1366, height: 768});

    // login
    try {
        yield page.goto('http://localhost:3000/#/permission/1/lg', {waitUntil: 'networkidle'});
        yield page.waitFor(1000);
        yield page.click('.login input');  // focus username input
        yield page.press('Backspace');
        yield page.type('1');
        yield page.click('.login a');
        yield page.waitFor(1000);
        yield page.reload();
    } catch (e) {
        console.log('login err: ', e)
    }

    // 新建申请
    try {
        let _newBtn = yield page.$('.task-second-nav li');
        console.log(_newBtn)
        yield _newBtn.click();
    } catch (e) {
        console.log('new error', e)
    }

    // 点击每个申请截图
    try {

        yield page.waitForSelector('.per_cards a');
        let _count = yield page.$$('.per_cards li').length;
        for (let i = 0; i < _count; i++) {
            let _tempPage = yield page.$$('.per_cards a')[i];
            yield _tempPage.click();
            yield page.screenshot({
                path: './imgs/',
                fullPage: true
            })
        }
    } catch (e) {

        console.log('fuck', e)
    }


}

co(perm)


// co(test);