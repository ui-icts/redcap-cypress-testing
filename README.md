## Cypress Testing for REDCap

This is a suite of tests that confirm the basic functionality of REDCap via the Cypress Framework.

Documentation for setting up Cypress can be found here: https://docs.cypress.io/guides/getting-started/installing-cypress.html

The `cypress` folder (containing the contents of this repo), along with two files named `cypress.json` and `cypress.env.json` should be placed in the root of your REDCap directory. Make sure the two JSON files are configured with your server's details.

Tests can be run with the `cypress run` command (more information here: https://docs.cypress.io/guides/guides/command-line.html)

### Writing additional tests

Some common REDCap actions have been automated to make writing new tests faster and more efficient:

* Before every group of tests is run, the "Initialize" action is run, which performs two REDCap API calls, one to get the current REDCap version number and the other to get the PID of the test project. These values are stored for the duration of the tests and used to build URLs. These values can then be accessed via `Cypress.env` (e.g. `cy.visit(Cypress.env('vUrl') + '/ProjectSetup/index.php?pid=' + Cypress.env('pid'))`)
* Before each test, the `cy.login` command is called. This is a custom command that authenticates with REDCap via POST request, bypassing the need to use the UI every time. There should rarely be any need to call this command manually.
* Any tests that take place within the context of a project run the `cy.initializeProject` command as their first action. This is a custom command that makes a series of REDCap API calls to restore the project to a "clean" state. This means deleting all existing records, loading `fixtures/metadata.json` to reset the project design, and loading `fixtures/project_settings.json` to reset various other project settings (such as disabling surveys).
* The custom command `cy.redcapApiCall` is available as a shortcut for making additional API calls. It takes a string to specify the "content" parameter and optionally takes a object for the "data" parameter. This is likely not comprehensive enough to make all API calls, but works for most of the calls made in the included tests.