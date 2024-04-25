/// <reference types="Cypress" />
describe('Empresa Miketec', function() {
    it('visitar o site da Miketec', function(){
        cy.visit('https://miketec.com.br/')
    })
   it('verifica o título da aplicação', function() {
    cy.visit('https://miketec.com.br/')
    cy.title().should('be.equal', 'MikeTec: Tecnologia para o sucesso do seu negócio de turismo')
  })
  it('verifica o subtitle Backoffice', function(){
    cy.visit('https://miketec.com.br/');
    cy.get('.et_pb_button_1')
      .click()
      .title()
      .should('be.equal', 'MikeTec BackOffice: O futuro da eficiência no turismo')
    })

  it('verifica o Provider', function(){
   cy.visit('https://miketec.com.br/');
    cy.get('.et_pb_button_2')
      .click().title().should('be.equal', 'Provider - Miketec')
  })
  it('verifica o Implementação e Treinamento', function(){
    cy.visit('https://miketec.com.br/');
    cy.get('.et_pb_button_4')
      .click().title().should('be.equal', 'Implementação e Treinamento - Miketec')
    })
})
