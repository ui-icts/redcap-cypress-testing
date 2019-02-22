/// <reference types="Cypress" />

describe('Online Designer', function() {
    beforeEach(function () {
        cy.visit(Cypress.env('vUrl') + '/Design/online_designer.php?pid=' + Cypress.env('pid'))
    })

    it('Restores project to known state', function () {
        cy.initializeProject()
    })

    it('Creates new instrument', function () {
        cy.get(':nth-child(2) > .jqbuttonsm').click()
        cy.contains('Add instrument here').click()
        cy.get('#new_form-demographics').type('New Instrument')
        cy.get('#new-demographics > .jqbuttonmed').click()
    })

    it('Adds field', function () {
        cy.get('#formlabel-new_instrument').click()
        cy.get('#btn-last').click()
        cy.get('#field_type').select('Text Box (Short Text, Number, Date/Time, ...)')
        cy.get('#field_label').type('Placeholder Field')
        cy.get('#field_name').type('placeholder var')
        cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
    })

    it('Renames instrument', function () {
        cy.get('#row_2 > :nth-child(5) > .fc > .formActions > .jqbuttonsm').click() // Choose action        
        cy.get('#formActionDropdown > :nth-child(1)').click() // Rename
        cy.get('#form_menu_description_input_span-new_instrument > :nth-child(1)').clear().type('Renamed Instrument')
        cy.get('#form_menu_save_btn-new_instrument').click()
    })

    it('Copies instrument', function () {
        cy.get('#row_2 > :nth-child(5) > .fc > .formActions > .jqbuttonsm').click() // Choose action
        cy.get('#formActionDropdown > :nth-child(2)').click() // Copy
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })

    it('Deletes instrument', function () {
        cy.get('#row_2 > :nth-child(5) > .fc > .formActions > .jqbuttonsm').click() // Choose action
        cy.get('#formActionDropdown > :nth-child(3)').click() // Delete
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })
});