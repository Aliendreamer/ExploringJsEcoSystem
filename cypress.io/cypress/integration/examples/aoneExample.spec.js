describe("browser actions",()=>{
   it("go to login page",()=>{
      cy.fixture('user').then(user=>{
         cy.visit("https://www.a1.bg/bg");
         cy.setResolution([1280,720]);
         cy.matchImageSnapshot("browser");
         cy.setResolution('ipad-2');
         cy.matchImageSnapshot("ipadTwo");
         cy.setResolution('iphone-x');
         cy.matchImageSnapshot("iphoneX");
         cy.setResolution('samsung-s10');
         cy.matchImageSnapshot("samsungsTen");
         cy.contains('Моят А1').click();
         cy.url().should("eq","https://sso.a1.bg/oauth/2/login");
         cy.setResolution([1280,720]);
         cy.matchImageSnapshot("browserLogin");
         cy.setResolution('ipad-2');
         cy.matchImageSnapshot("ipadToLogin");
         cy.setResolution('iphone-x');
         cy.matchImageSnapshot("iphoneTenLogin");
         cy.setResolution('samsung-s10');
         cy.matchImageSnapshot("samsungsTenLogin");
         cy.get('#username').type(user.name);
         cy.get('#password').type(user.password);
         cy.contains('Вход').click();
         cy.get(".login-panel>div").should(($divs)=>{
            expect($divs.eq(3)).to.contain("Грешно въведен e-mail, потребителско име или парола.")
         });
         cy.setResolution([1280,720]);
         cy.matchImageSnapshot("browserError");
         cy.setResolution('ipad-2');
         cy.matchImageSnapshot("ipadTwoError");
         cy.setResolution('iphone-x');
         cy.matchImageSnapshot("iphoneXError");
         cy.setResolution('samsung-s10');
         cy.matchImageSnapshot("samsungsTenError");
      })
   })
})
