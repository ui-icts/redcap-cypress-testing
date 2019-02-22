/// <reference types="Cypress" />

describe('Project Setup', function() {
    beforeEach(function () {
        cy.visit(Cypress.env('vUrl') + '/ProjectSetup/index.php?pid=' + Cypress.env('pid'))
    })

    it('Restores project to known state', function () {
        cy.initializeProject()
    })

    it('Configures main project settings', function () {
        cy.get('#setupEnableSurveysBtn').click()
        cy.wait(1000)

        cy.get('#setupLongiBtn').click()
        cy.wait(1000)
    })

    it('Edits project details', function () {
        cy.contains('Modify project title, purpose, etc.').click()
        cy.get('#purpose').select('Practice / Just for fun')
        cy.get('#project_note').clear().type('testing')
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })
});