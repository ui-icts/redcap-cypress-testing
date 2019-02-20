/// <reference types="Cypress" />

describe('Create test project', function() {
    beforeEach(function () {
        cy.login('standard')
    })

    it('Deletes old test project (if exists)', function () {
        cy.visit('/index.php?action=myprojects')
        cy.wait(1000)

        var oldProject = cy.contains('Cypress Test Project');

        if (oldProject) {
            oldProject.click()
            cy.contains('Other Functionality').click()
            cy.contains('Delete the project').click()

            cy.get('#delete_project_confirm').type('delete')
            cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
            cy.contains('Yes, delete the project').click()

            cy.contains('Project successfully deleted!')
        }
    })

    it('Creates new test project', function () {
        cy.visit('/index.php?action=create')

        cy.get('#app_title').type('Cypress Test Project')
        cy.get('#purpose').select('Practice / Just for fun')
        cy.get('#project_note').type('Cypress test started ' + new Date().toLocaleString())
        cy.get('[name="project_template_radio"][value="1"]').click() // Use template
        cy.contains('Basic Demography').click()

        // Click Create Project button
        cy.get('.btn-primaryrc').click()

    })
});