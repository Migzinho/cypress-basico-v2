Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const 
    firstName = 'Emidio',
    lastName = 'Mignozzetti',
    email = 'emidio.mig@hotmail.com',
    textArea = 'Teste'
    cy.get('#firstName').should('be.visible').type(firstName)
    cy.get('#lastName').should('be.visible').type(lastName)
    cy.get('#email').should('be.visible').type(email)
    cy.get('#open-text-area').should('be.visible').type(textArea)
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('verificaResultados', function(){
    cy.get('[data-testid="result"]')
      .should('have.length', 10)
})

Cypress.Commands.add('setDate', date => {
    cy.get('[data-cy="birthdate-date-field"]')
      .type(date)
      .should('have.value', date)
      .blur()
})