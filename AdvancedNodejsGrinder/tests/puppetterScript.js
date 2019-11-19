const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('http://localhost:3000/')
  
  await page.setViewport({ width: 1906, height: 1032 })
  
  await page.waitForSelector('#root > .container > div > div > h1')
  await page.click('#root > .container > div > div > h1')
  
  await page.waitForSelector('.indigo > .nav-wrapper > .right > li > a')
  await page.click('.indigo > .nav-wrapper > .right > li > a')
  
  await navigationPromise
  
  await page.waitForSelector('.indigo > .nav-wrapper > .right > li:nth-child(2) > a')
  await page.click('.indigo > .nav-wrapper > .right > li:nth-child(2) > a')
  
  await navigationPromise
  
  await page.waitForSelector('.indigo > .nav-wrapper > .right > li > a')
  await page.click('.indigo > .nav-wrapper > .right > li > a')
  
  await navigationPromise
  
  await page.waitForSelector('div > .card:nth-child(1) > .card-stacked > .card-action > a')
  await page.click('div > .card:nth-child(1) > .card-stacked > .card-action > a')
  
  await browser.close()
})()