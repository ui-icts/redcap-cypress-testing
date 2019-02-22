Cypress.Commands.add("login", (type) => {
    const credentials = Cypress.env("users")[type]

    cy.request({
        method: "GET",
        url: "/", // baseUrl is prepended to url
        form: true,
        body: {
            "logout": 1
        }
    }).then(() => {
        cy.request({
            method: "POST",
            url: "/", // baseUrl is prepended to url
            form: true,            
            body: {
                "username": credentials["user"],
                "password": credentials["pass"],
                "submitted": 1,
                "redcap_login_a38us_09i85": "redcap_login_a38us_09i85"
            }
        })
    })
})

Cypress.Commands.add("redcapApiCall", (content, obj) => {
    if (obj) {
        cy.request({
                    method: "POST",
                    url: "/api/", // baseUrl is prepended to url
                    form: true,
                    body: {
                        "token": Cypress.env("token"),
                        "content": content,
                        "format": "json",
                        "returnFormat": "json",
                        "data": JSON.stringify(obj)
                    }
            })
    }
    else {
        cy.request({
            method: "POST",
            url: "/api/", // baseUrl is prepended to url
            form: true,
            body: {
                "token": Cypress.env("token"),
                "content": content,
                "format": "json",
                "returnFormat": "json"
            }
        })
    }
})

Cypress.Commands.add("initializeProject", () => {
    // Delete all records
    cy.request({
        method: "POST",
        url: "/api/", // baseUrl is prepended to url
        form: true,
        body: {
            "token": Cypress.env("token"),
            "content": "record",
            "format": "json",
            "returnFormat": "json",
            "fields": "record_id"
        }
    }).then((data) => {
        let ids = []

        for (var record in data.body) {
            ids.push(data.body[record]['record_id'])
        }

        if (ids.length > 0) {
            cy.request({
                method: "POST",
                url: "/api/", // baseUrl is prepended to url
                form: true,
                body: {
                    "token": Cypress.env("token"),
                    "content": "record",
                    "format": "json",
                    "returnFormat": "json",
                    "action": "delete",
                    "records": ids
                }
            })
        }        
    })

    // Restore data dictionary
    cy.readFile('cypress/fixtures/metadata.json').then((file) => {
        cy.redcapApiCall('metadata', file)
    })
    
    // Set project settings to defaults
    cy.readFile('cypress/fixtures/project_settings.json').then((file) => {
        cy.redcapApiCall('project_settings', file)
    })
})