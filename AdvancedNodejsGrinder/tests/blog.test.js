const Page = require('./factories/page');

let page;
beforeEach( async ()=>{
    page = await Page.build();
    await page.goto('http://localhost:3000')
})

afterEach( async() => {
    await page.close();
})

describe('While logged in', async ()=>{

    beforeEach(async()=>{
        await page.login();
        await page.goto('http://localhost:3000/blogs')
        await page.click('a.btn-floating');  
    })
 
    test("user can see create blog form",async ()=>{
        const label = await page.getContentsOf('form label');
        expect(label).toEqual("Blog Title");
    })

    describe("and using valid inputs", async () =>{
        
        beforeEach(async () =>{
            await page.type('.title input',"test input for blog creation");
            await page.type('.content input',"test input again");
            await page.click('form button');
        })
        
        test("submitting takes uset to review screen", async () => {
             const text = await page.getContentsOf('h5');
             expect(text).toEqual('Please confirm your entries');
        }) 

        test("submitting lead to index page",async () => {
            await page.click('button.green');
            await page.waitFor('.card');
            
            const title = await page.getContentsOf('.card-title');
            const content = await page.getContentsOf('p');

            expect(title).toEqual("test input for blog creation"); 
            expect(content).toEqual("test input again");
        })
    });

    describe("and using invalid inputs", async ()=>{
         
        beforeEach( async () => {
            await page.click('form button');
        })
        test('form shows error message',async () => {  
            const titleError = await page.getContentsOf('.title .red-text');
            const  contentError = await page.getContentsOf('.content .red-text');
            expect(titleError).toEqual("You must provide a value");
            expect(contentError).toEqual("You must provide a value");
         })


    })
})

describe("user not logged in ",async () => {


    test("user cannot create blog posts",async  () =>{
         const result =await  page.evaluate(()=>{
            return  fetch('/api/blogs',{
                 method:'POST',
                 credentials: 'same-origin',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({title:'testTitle', content:'testContent'})
             }).then(res=>res.json());
         })
         expect(result).toEqual({error: 'You must log in!'});
    })

    test("user cannot get blog list",async  () =>{
        const result =await  page.evaluate(()=>{
            return  fetch('/api/blogs',{
                method:'GET',
                credentials: 'same-origin',
                headers: {                        
                'Content-Type': 'application/json'            
            }}).then(res=>res.json());
        })
            expect(result).toEqual({error: 'You must log in!'});
        })
})

