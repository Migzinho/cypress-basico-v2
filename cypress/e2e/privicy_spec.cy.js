Cypress._.times(20, function (){
  it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
})
})