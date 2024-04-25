/// <reference types="Cypress" />
describe('Search',() => {
    beforeEach(() => {
     cy.intercept(
       'GET',
       '**?q=cypress.io**')
       .as('getSearchResults')
     cy.visit('https://duckduckgo.com/')
     cy.get('input[type="text"]')
       .should('be.visible')
       .as('searchField')
    })
    it('pesquisa utilizando o ENTER do teclado', () => {
      cy.get('@searchField')
        .type('cypress.io{downarrow}{downarrow}{downarrow}{enter}', {delay: 1000})
      cy.wait('@getSearchResults') 
      cy.verificaResultados()
    })
    it('pesquisa utilizando o botão de busca', () => {
      cy.get('@searchField')
        .type('cypress.io')
      cy.get('.searchbox_searchButton__F5Bwq')
        .should('be.visible')
        .click()    
      cy.wait('@getSearchResults')
      cy.verificaResultados()
    })
    it('pesquisa pelo form', () => {
      cy.get('@searchField')
        .type('cypress.io')
      cy.get('form').submit()
      cy.wait('@getSearchResults')
      cy.verificaResultados()
    })
})