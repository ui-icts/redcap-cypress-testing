## Cypress Testing for REDCap

This is a suite of automated tests that confirm the basic functionality of REDCap via the Cypress Framework.

### Quick Setup

1. Download and extract Cypress: http://download.cypress.io/desktop
2. Open Cypress, drag and drop the folder containing this repo's contents onto the Cypress window
3. Rename the two example files (`cypress.json` and `cypress.env.json`) and edit to include the relevant details for your REDCap installation:
* REDCap URL
* Project API token (generate this with a user that has Project Design and User Rights, preferably separate from the non-admin test account)
* Username and password for test account
4. You should now be able to run individual tests by clicking them or run the full suite by clicking "Run all specs"

### Advanced Setup

The instructions above will allow you to quickly run tests from your local desktop, but it's also possible to run Cypress from a remote location (such as your REDCap server), which may be preferable for automation purposes. Please refer to the offical Cypress documentation for more info: https://docs.cypress.io/guides/getting-started/installing-cypress.html

### Writing additional tests

Some common REDCap actions have been automated to make writing new tests faster and more efficient:

* Before any test are run, the "Initialize" action performs two REDCap API calls, one to get the current REDCap version number and the other to get the PID of the test project. These values are stored for the duration of the tests and used to build URLs. These values can then be accessed via `Cypress.env` (e.g. `cy.visit(Cypress.env('vUrl') + '/ProjectSetup/index.php?pid=' + Cypress.env('pid'))`)
* Before each test, the `cy.login` command is called. This is a custom command that authenticates with REDCap via POST request, bypassing the need to use the UI every time. There should rarely be any need to call this command manually.
* Any tests that take place within the context of a project run the `cy.initializeProject` command as their first action. This is a custom command that makes a series of REDCap API calls to restore the project to a "clean" state. This means deleting all existing records, loading `fixtures/metadata.json` to reset the project design, and loading `fixtures/project_settings.json` to reset various other project settings (such as disabling surveys).
* The custom command `cy.redcapApiCall` is available as a shortcut for making additional API calls. It takes a string to specify the "content" parameter and optionally takes a object for the "data" parameter. This is likely not comprehensive enough to make all API calls, but works for most of the calls made in the included tests.