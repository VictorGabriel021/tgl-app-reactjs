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
      email: "felipe010@gmail.com",
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

Cypress.Commands.add("selectFilterBetList", (gameSelected, gameBtn) => {
  cy.login();
  cy.visit("http://localhost:3000");

  cy.route("GET", `**/bet/all-bets?type[]=${gameSelected}`).as(
    "getBetFiltered"
  );

  cy.get(gameBtn).click();

  cy.wait("@getBetFiltered").then((xhr) => {
    cy.log(xhr.response.body);
    expect(xhr.status).to.eq(200);
  });
});

Cypress.Commands.add("selectFilterBetListEmpty", (gameSelected, gameBtn) => {
  cy.login();
  cy.visit("http://localhost:3000");

  cy.route("GET", `**/bet/all-bets?type[]=${gameSelected}`).as(
    "getBetFiltered"
  );

  cy.get(gameBtn).click();

  cy.wait("@getBetFiltered").then((xhr) => {
    cy.log(xhr.response.body);
    expect(xhr.status).to.eq(200);

    if (xhr.response.body.length === 0) {
      cy.get(".alert > p").should("exist");
    }
  });
});

Cypress.Commands.add(
  "selectFilterBetGame",
  (gameSelected, gameBtn, expected) => {
    cy.login();
    cy.get(":nth-child(1) > .sc-bqiRlB > a").click();

    cy.get(":nth-child(4) > .sc-bdvvtL").click();

    cy.get(gameSelected).click();

    cy.get(gameBtn)
      .invoke("text")
      .then(($value) => {
        expect($value).be.eq(expected);
      });
  }
);
