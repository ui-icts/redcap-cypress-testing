Cypress.Commands.add("login", (type) => {
    const users = Cypress.env("users")

    cy.request({
        method: "POST",
        url: "/", // baseUrl is prepended to url
        form: true,
        body: {
            "username": users[type]["user"],
            "password": users[type]["pass"],
            "submitted": 1,
            "redcap_login_a38us_09i85": "redcap_login_a38us_09i85"
        }
    })
})

Cypress.Commands.add("redcapApiCall", (content, data) => {
    if (data) {
        cy.request({
                    method: "POST",
                    url: "/api/", // baseUrl is prepended to url
                    form: true,
                    body: {
                        "token": Cypress.env("token"),
                        "content": content,
                        "format": "json",
                        "returnFormat": "json",
                        "data": data
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