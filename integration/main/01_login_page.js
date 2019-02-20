/// <reference types="Cypress" />

describe('Login Page', function() {
    const users = Cypress.env("users");
    const username = users['standard']['user'];
    const password = users['standard']['pass'];

    it('Fails to login', function() {
        cy.visit('/index.php');

        // Login with no credentials
        cy.get('input[name=password]').type(`{enter}`);
        cy.get('.red').should('contain', 'ERROR')
    });

    it('Successfully logs in', function() {
        cy.visit('/index.php');

        // Login with correct credentials
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.get('#username-reference').should('contain', username)
    })
});