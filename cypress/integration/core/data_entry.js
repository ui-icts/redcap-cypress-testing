/// <reference types="Cypress" />

describe('Add / Edit Records', function() {
    beforeEach(function () {
        cy.visit(Cypress.env('vUrl') + '/DataEntry/record_home.php?pid=' + Cypress.env('pid'))
    })

    it('Restores project to known state', function () {
        cy.initializeProject()
    })

    it('Adds record', function() {
        cy.get('.data > button').click()

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
        cy.get('#demographics_complete-tr > .data > span > .x-form-text').select('Complete')
        cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()
    })

    it('Edits record', function() {
        cy.get('#record').select('1')
        cy.get('.nowrap > a > img').click()

        cy.get('#first_name-tr > .data > .x-form-text').clear().type('Edit')
        cy.get('#label-ethnicity-1').click()
        cy.get('#race-tr > .data > span > .x-form-text'). select('More Than One Race')
        cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()
    })

    it('Deletes form data', function() {
        cy.get('#record').select('1')
        cy.get('.nowrap > a > img').click()

        cy.get('#__DELETEBUTTONS__-div > .btn').click()
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })

    it('Deletes record', function() {
        cy.get('#record').select('1')
        cy.get('#recordActionDropdownTrigger').click()
        cy.get('#ui-id-4').click()
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })
});