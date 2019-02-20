/// <reference types="Cypress" />

describe('Test Online Designer', function() {
    it('Restores project design to expected state', function () {
        cy.readFile('cypress/fixtures/initialize.json').then((file) => {
            cy.redcapApiCall('metadata', JSON.stringify(file))
        })
    })

    beforeEach(function () {
        cy.login('standard')
        cy.redcapApiCall('version').then((version) => {
            let url = Cypress.config().baseUrl + '/redcap_v' + version.body 

            cy.redcapApiCall('project').then((data) => {
                url += '/Design/online_designer.php?pid=' + data.body.project_id

                cy.visit(url)
            })
        })
    })

    it('Creates new instrument and adds fields', function () {
        cy.get(':nth-child(2) > .jqbuttonsm').click() // Create a new instrument
        cy.contains('Add instrument here').click()
        cy.get('#new_form-demographics').type('New Instrument123')
        cy.get('#new-demographics > .jqbuttonmed').click()
        cy.get('#formlabel-new_instrument123').click()
        cy.get('#btn-last').click()
        cy.get('#field_type').select('Text Box (Short Text, Number, Date/Time, ...)')
        cy.get('#field_label').type('Placeholder Field')
        cy.get('#field_name').type('placeholder var')
        cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
    })
});