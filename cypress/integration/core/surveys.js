/// <reference types="Cypress" />

describe('Surveys', function() {
    it('Restores project to known state', function () {
        cy.initializeProject()
    })

    it('Enables survey', function () {
        cy.visit(Cypress.env('vUrl') + '/ProjectSetup/index.php?pid=' + Cypress.env('pid'))
        cy.get('#setupEnableSurveysBtn').click()
        cy.wait(1000)

        cy.visit(Cypress.env('vUrl') + '/Design/online_designer.php?pid=' + Cypress.env('pid'))
        cy.get('#row_1 > :nth-child(5) > .fc > .jqbuttonsm').click()
        cy.get('#surveySettingsSubmit').click()
    })

    it('Opens public survey and submits', function () {
        cy.visit(Cypress.env('vUrl') + '/Surveys/invite_participants.php?pid=' + Cypress.env('pid'))
        cy.get('#longurl').invoke('val').then((url) => {
            cy.visit(url)
        })

        cy.get('#first_name-tr > .data > .x-form-text').type('Test')
        cy.get('#last_name-tr > .data > .x-form-text').type('Testington')
        cy.get('#address').type('123 Test St')
        cy.get('#telephone-tr > .data > .x-form-text').type('555-555-5555')
        cy.get('#email-tr > .data > .x-form-text').type('invalid email').blur()
        cy.get('.ui-dialog-buttonset > .ui-button').click()
        cy.get('#email-tr > .data > .x-form-text').clear().type('test@test.com')
        cy.get('.jqbuttonsm').click()
        cy.get('#label-ethnicity-2').click()
        cy.get('#race-tr > .data > span > .x-form-text'). select('Unknown / Not Reported')
        cy.get('#label-sex-0').click()
        cy.get('#height-tr > .data > .x-form-text').type('150')
        cy.get('#weight-tr > .data > .x-form-text').type('70')
        cy.get('#comments').type('Comments go here')
        cy.get('.jqbutton').click()
    })

    it('Deletes survey settings', function () {
        cy.visit(Cypress.env('vUrl') + '/Design/online_designer.php?pid=' + Cypress.env('pid'))

        cy.get('.modsurvstg').click()
        cy.get('[style="margin:30px 0 10px;"] > .btn').click()
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })
});