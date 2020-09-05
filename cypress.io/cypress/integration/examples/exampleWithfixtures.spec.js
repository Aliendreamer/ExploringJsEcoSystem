
describe("should use fixture data",()=>{
   it("should try login",()=>{
      cy.visit("http://zero.webappsecurity.com/login.html")
      cy.fixture("user").then(user=>{
         const username= user.name;
         const password = user.password
         cy.get("#user_login").type(username)
         cy.get("#user_password").type(password)
         cy.contains("Sign in").click()
      });
   })
})