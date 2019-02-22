describe('Main Navigation', function() {
    it('Visit each page on nav bar', function() {
        cy.visit('/index.php')
        cy.visit('/index.php?action=myprojects')
        cy.visit('/index.php?action=create')    
        cy.visit('/index.php?action=help')    
        cy.visit('/index.php?action=training')
        cy.visit(Cypress.env('vUrl') + '/index.php?route=SendItController:upload')
    })   
})