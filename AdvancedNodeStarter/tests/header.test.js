const puppeteer = require("puppeteer");
const sessionFactory = require("./factories/sessionFactory");
const userFactory = require("./factories/userFactory");
let browser,page;

beforeEach( async ()=>{
    browser = await puppeteer.launch({
        headless:false
    });  
    page = await browser.newPage();
})

afterEach( async() => {
    await browser.close();
})

test("Check header text is correct",async ()=>{
 
    await page.goto('localhost:3000');
    const text = await page.$eval('a.brand-logo',el=>el.innerHTML);
    expect(text).toEqual('Blogster')
})

test("Clicking loging start Oath flow",async()=>{
    await page.goto('localhost:3000')
    await page.click('.right a');
    const url = page.url();    
    expect(url).toMatch(/accounts\.google.\com/);   
})

 test("When signed in show logout",async () =>{
    
    const user = await userFactory();
    const {session,sig}= sessionFactory(user);
    await page.setCookie({name:'session', value: session});
    await page.setCookie({name: 'session.sig', value: sig});
    await page.goto('localhost:3000')
    await page.waitFor('a[href="/auth/logout"]');
    const text =await page.$eval('a[href="/auth/logout"]',el => el.innerHTML);
    expect(text).toEqual('Logout')
 });
