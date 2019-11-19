const puppeteer = require('puppeteer');
const userFactory = require('./userFactory');
const sessionFactory = require('./sessionFactory');
class Page {
constructor(page){
    this.page = page;
}
    static async build(){
        const browser = await puppeteer.launch({
            headless:true
        });
        const page = await browser.newPage();
        const customPage = new Page(page);
        return new Proxy(customPage,{
            get: function(target,property){
                return customPage[property] || browser[property] || page[property];
            }
        })
    }
    async login(){
        const user = await userFactory();
        const {session,sig}= sessionFactory(user);
        await this.page.setCookie({name:'session', value: session});
        await this.page.setCookie({name: 'session.sig', value: sig});    
        await this.page.goto('http://localhost:3000')
        await this.page.waitFor('a[href="/auth/logout"]');
    }
    async getContentsOf(selector){
        return await this.page.$eval(selector,el => el.innerHTML);
    }
}

module.exports = Page;