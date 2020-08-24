describe("first test",()=>{
   it("should be true",()=>{
      expect(true).to.equal(true)
   })
})

describe("browser actions",()=>{
   it("load url",()=>{
      cy.visit("www.example.com")
   })
   it("check url",()=>{
      cy.url().should("include","example")
   })
   it("check element",()=>{
      cy.get("h1").should("be.visible")
   })
})

describe("interact actions",()=>{
   it("load url",()=>{
      cy.visit("http://books.toscrape.com/index.html")
      cy.url().should("include","index.html")
   })
   it("should click button",()=>{
     cy.get("a").contains("Travel").click()
     cy.get("h1").contains("Travel")
   })

})