const puppeteer = require('puppeteer');

const data = {
    username: 'test1',
    password: '123456'
}

// init
async function spms() {
    const broswer = await puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    const page = await broswer.newPage();
    page.setViewport({width: 1366, height: 768});

    await login(page);
    await gotoPerm(page);

}

async function login(page) {
    await page.goto('http://192.168.0.18/spms/static/home/index.html#/loginPartner');
    await page.waitForSelector('#username');
    // let username = await page.$('#username');
    await page.focus('#username');
    await page.keyboard.down('Control');
    await page.press('a');
    await page.keyboard.up('Control');
    await page.press('Backspace');
    await page.type(data.username);

    await page.focus('#password');
    await page.keyboard.down('Control');
    await page.press('a');
    await page.keyboard.up('Control');
    await page.press('Backspace');
    await page.type(data.password);

    await page.waitFor(1000);
    await page.click('#login_button');

}

async function gotoPerm(page) {
    await page.waitForSelector('.app-manage');
    page.hover('.app-manage');
    let perm = await page.$('.nav-list:nth-of-type(2) li:nth-child(2) a');
    await perm.click();

}
spms();