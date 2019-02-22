// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('SyntaxError:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Initialize', function () {
    // Get REDCap URL with current version
    cy.redcapApiCall('version').then((version) => {
        Cypress.env('vUrl', '/redcap_v' + version.body)
    })

    // Get project ID for use in URLs
    cy.redcapApiCall('project').then((data) => {
        Cypress.env('pid', data.body.project_id)
    })
})

beforeEach(function() {
    cy.login('standard')
})