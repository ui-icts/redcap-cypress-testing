const cypress = require('cypress')

cypress.run({
    env: {
        "CYPRESS_RUN_BINARY": "./node_modules/.bin/cypress",
        "CYPRESS_CACHE_FOLDER": "./cypress-files/"
    }
});