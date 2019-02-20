/// <reference types="Cypress" />

describe('Test Online Designer', function() {

    it('Restores project to expected state', function () {
        cy.readFile('cypress/fixtures/02_project_setup.json').then((file) => {
            cy.redcapApiCall('project_settings', JSON.stringify(file))
        })
    })

    beforeEach(function () {
        cy.login('standard')
        cy.redcapApiCall('version').then((version) => {
            let url = Cypress.config().baseUrl + '/redcap_v' + version.body 

            cy.redcapApiCall('project').then((data) => {
                url += '/ProjectSetup/index.php?pid=' + data.body.project_id

                cy.visit(url)
            })
        })
    })

    it('Configures "Main project settings"', function () {
        cy.get('#setupEnableSurveysBtn').click()
        cy.wait(1000)

        cy.get('#setupLongiBtn').click()
        cy.wait(1000)
    })

    it('Edits project details', function () {
        cy.contains('Modify project title, purpose, etc.').click()
        cy.get('#app_title').clear().type('Cypress Test Project (Test In Progress)')
        cy.get('#purpose').select('Practice / Just for fun')
        cy.get('#project_note').clear().type('Cypress test started ' + new Date().toLocaleString())
        cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
    })
});