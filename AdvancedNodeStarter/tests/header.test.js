const Page = require('./factories/page');

let page;
beforeEach( async ()=>{
    page = await Page.build();
    await page.goto('http://localhost:3000')
})

afterEach( async() => {
    await page.close();
})

test("Check header text is correct",async ()=>{
 
    const text = await page.getContentsOf('a.brand-logo')
    expect(text).toEqual('Blogster')
})

test("Clicking loging start Oath flow",async()=>{ 
    await page.click('.right a');
    const url = await page.url();    
    expect(url).toMatch(/accounts\.google\.com/);   
})

 test("When signed in show logout",async ()=>{     
    await page.login();
    const text =await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout')
 });
