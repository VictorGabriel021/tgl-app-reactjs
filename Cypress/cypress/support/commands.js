// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createUser", () => {
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:3333/user/create",
    body: {
      name: "Victor Gabriel",
      email: "felipeao12@gmail.com",
      password: "1234",
    },
  }).then((response) => {
    expect(response.body.user).is.not.null;
    expect(response.body.token).is.not.null;
    Cypress.env("createdUser", response.body);
  });
});

Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3000/user/details", {
    onBeforeLoad: (browser) => {
      browser.localStorage.setItem(
        "login",
        JSON.stringify(Cypress.env("createdUser"))
      );
    },
  });
});
