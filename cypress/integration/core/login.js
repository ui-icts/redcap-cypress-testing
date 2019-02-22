/// <reference types="Cypress" />

describe('Login Page', function() {
    const users = Cypress.env("users");
    const username = users['standard']['user'];
    const password = users['standard']['pass'];

    beforeEach(function () {
        cy.visit('/index.php?logout=1');
    })

    it('Fails to login', function() {
        // Login with no credentials
        cy.get('input[name=password]').type(`{enter}`);
        cy.get('.red').should('contain', 'ERROR')
    });

    it('Successfully logs in', function() {
        // Login with correct credentials
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#username-reference').should('contain', username)
        cy.wait(1000) // todo ignore error when loading record counts
    })
});