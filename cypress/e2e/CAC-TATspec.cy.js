/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')

  })
  //1º Execicio Extra
  it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })
  //2º Execicio Extra
  it('preenche os campos obrigatórios e envia o formulário', function() {
      const 
      firstName = 'Emidio',
      lastName = 'Mignozzetti',
      email = 'emidio.mig@hotmail.com',
      textArea = 'Teste, teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste,  teste.'
      cy.get('#firstName').should('be.visible').type(firstName)
      cy.get('#lastName').should('be.visible').type(lastName)
      cy.get('#email').should('be.visible').type(email)
      cy.get('#open-text-area').should('be.visible').type(textArea, {delay:0})
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
  })
  //3º Execicio Extra
  it('exibe mensagem de erro ao submeter o formulário com um email incorreto', function() {
      const emailErrado = 'teste_123',
            firstName = 'Emidio',
            lastName = 'Mignozzetti',
            textArea = 'Teste'
      cy.get('#firstName').should('be.visible').type(firstName)
      cy.get('#lastName').should('be.visible').type(lastName)
      cy.get('#open-text-area').should('be.visible').type(textArea)
      cy.get('#email').should('be.visible').type(emailErrado)
      cy.contains('button','Enviar').click()
      cy.get('.error').should('be.visible')
  })
  //4º Execicio Extra
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido corretamente', function() {
    const telefoneErrado = 'teste teste'
      cy.get('#firstName').should('be.visible').type('Emidio')
      cy.get('#lastName').should('be.visible').type('Mignozzetti')
      cy.get('#email').should('be.visible').type('emidio.mig@hotmail.com')
      cy.get('#open-text-area').should('be.visible').type('teste')
      cy.get('#phone').should('be.visible').type(telefoneErrado).should('have.value','')
      cy.get('#phone-checkbox').click().should('be.visible')
      cy.contains('button','Enviar').click()
      cy.get('.error').should('be.visible')
  })
  //5º Execicio Extra
  it('preenche e limpa os campos nome, sobrenome, email e telefone, e tornar o telefone obrigatório e depois reverter esta ação', function(){
    cy.get('#firstName')
      .should('be.visible')
      .type('Emidio')
      .should('have.value', 'Emidio')
      .clear()
    cy.get('#lastName')
      .type('Mignozzetti')
      .should('have.value', 'Mignozzetti')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('emidio.mig@hotmail.com')
      .should('have.value', 'emidio.mig@hotmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone-checkbox')
      .click()
      .should('be.checked')
    cy.get('#phone')
      .type('11987654321')
      .should('have.value', '11987654321')
      .clear()
    cy.get('#phone-checkbox')
    .click()
    .should('not.be.checked')
    });
  //6º Execicio Extra
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  });
  //7º Execicio Extra
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  //Aula 18 - Seletores
  it('Selecionar um produto', function(){
    cy.get('#product').select('Blog').should('have.value', 'blog')
    cy.get('#product').select('youtube').should('have.value', 'youtube')
    cy.get('#product').select(2).should('have.value', 'cursos')
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })
  it('selecionar uma opcao aletoria em um seletor',function(){
    cy.get('select option')
      .as('optios')
      .its('length',{log:false}).then(n=>{
        cy.get('@optios',{log:false}).then($options=>{
          const randomOptionIndex = Cypress._.random(n-1)
          const randomOptionText = $options[randomOptionIndex].innerText
          cy.get('#product').select(randomOptionText)
        })
      })
    })
    // it('selecionar uma opcao aletoria de forma mais simples',function(){
    //   cy.get('select option')
    //     .its('length',{log:false}).then(n => {
    //       cy.get('#product').select(Cypress._.random(n-1))
    //       })
    // })
    // Exercício
    // Crie um novo teste chamado seleciona um produto (YouTube) por seu texto
    // Verifique que após a seleção, tal opção foi realmente selecinada (.should('have.value', 'valor-aqui'))
    // Por fim, execute o novo teste no Test Runner
    it('seleciona um produto (YouTube) por seu texto', function (){
      cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })
    // Exercício extra 1
    // Crie um novo teste chamado seleciona um produto (Mentoria) por seu valor (value)
    // Verifique que após a seleção, tal opção foi realmente selecinada (.should('have.value', 'valor-aqui'))
    // Por fim, execute o novo teste no Test Runner
    it('seleciona um produto (Mentoria) por seu valor (value)', function (){
      cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    // Exercício extra 2
    // Crie um novo teste chamado seleciona um produto (Blog) por seu índice
    // Verifique que após a seleção, tal opção foi realmente selecinada (.should('have.value', 'valor-aqui'))
    // Por fim, execute o novo teste no Test Runner
    it('seleciona um produto (Blog) por seu índice', function (){
      cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
    // Marcando inputs do tipo radio
    // Exercício
    // Crie um teste chamado marca o tipo de atendimento "Feedback"
    // Faça a verificação que o valor correto foi selecionado após o .check()
    // Por fim, execute o novo teste no Test Runner
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })
    // Exercício extra
    // Crie um teste chamado marca cada tipo de atendimento
    // Faça a verificação de que após o .check(), cada radio foi marcado (.should('be.checked'))
    // Por fim, execute o novo teste no Test Runner
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"][value="ajuda"]')
        .check()
        .should(('be.checked'))
        .should('have.value', 'ajuda')
      cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should(('be.checked'))
        .should('have.value', 'elogio')
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should(('be.checked'))
        .should('have.value', 'feedback')
    })   
    it('Outra forma: marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .should(('be.checked'))
        .each(function ($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    // Exercício
    // Crie um teste chamado marca ambos checkboxes, depois desmarca o último
    // O teste deve possuir verificações de que ambos checkboxes foram marcados, e depois, que o último (.last()) foi desmarcado
    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('#email-checkbox')
        .check()
        .should('be.checked')
      cy.get('#phone-checkbox')
        .check()
        .should('be.checked')
        .uncheck()
        .should('not.be.checked')
    })
    it('Outra forma de fazer: marca ambos checkboxes, depois desmarca o último', function () {
      cy.get('input[type="checkbox"]')
        .check()
        .should('have.length',2)
        .should('be.checked')
        .first()
        .should('be.visible')
        .last()
        .should('be.visible')
        .uncheck()
        .should('not.be.checked')
    })
    // Exercício extra
    // Revise o teste chamado exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário, para garantir que em vez de um .click(), o comando .check() é utilizado para marcar o checkbox Telefone.
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#phone-checkbox')
        .check()
        .should('be.checked')
      cy.get('.button')
        .click()
      cy.get('.error')
        .should('be.visible')
    })
    //Como marcar vários checkboxes de uma só vez com Cypress
    it('marcar todas checkbox com apenas um click', () => {
      cy.get('#check input[type="checkbox"]')
        .as('checkboxes')
        .check()  
      cy.get('@checkboxes')
        .each(checkbox => {
          expect(checkbox[0].checked).to.equal(true)
        })
    })
    //     Exercício
    // Crie um teste chamado seleciona um arquivo da pasta fixtures
    // Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should('not.have.focus')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    // Exercício extra 1
    // Crie um teste chamado seleciona um arquivo simulando um drag-and-drop
    // Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    // Exercício extra 2
    // Crie um teste chamado seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
    // Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json', { encoding: null})
        .as('exampleFile')
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('@exampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    // Exercício extra 3
    // Crie um teste chamado seleciona dois arquivos da pasta fitures
    // Tal teste deve verificar se os dois arquivos distintos estão corretos
    it('seleciona dois arquivos da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile([
          'cypress/fixtures/example.json',
          'cypress/fixtures/example2.json'
        ])
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json')
          expect(input[0].files[1].name).to.equal('example2.json')
        })
    })
    // Exercício extra 41
    // Cria um teste chamado seleciona dois arquivos da pasta fixtures, só que atraves de alias
    // Tal teste deve verificar se os dois arquivos distintos estão corretos
    // it('seleciona dois arquivos da pasta fixtures, só que atraves de alias', function(){
    //   cy.fixture('example.json')
    //     .as('fileOne')
    //   cy.fixture('example2.json')
    //     .as('fileTwo')
    //   cy.get('input[type="file"]#file-upload')
    //     .should('not.have.value')
    //     .selectFile([
    //       '@fileOne',
    //       '@fileTwo'])
    //     .should(function($input) {
    //       expect($input[0].files[0].name).to.equal('example.json')
    //       expect($input[0].files[1].name).to.equal('example2.json')
    //     })
    // })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')
    })
});