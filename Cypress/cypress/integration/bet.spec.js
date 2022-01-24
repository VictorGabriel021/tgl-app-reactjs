///<reference types="cypress" />

describe("Bet", () => {
  it("Deve criar uma aposta da Mega-Sena de forma aleatória", () => {
    cy.login();
    cy.visit("http://localhost:3000/lottery/games");
    cy.get(".bQpMQD").click();

    for (let i = 0; i < 7; i++) {
      cy.get(".sc-eJwWfJ > div > :nth-child(1)")
        .should("be.visible")
        .click({ force: true });
      cy.get(".sc-ehCJOs").should("be.visible").click({ force: true });
    }

    cy.route("GET", "**/bet/all-bets").as("listBetsUser");

    cy.get(".sc-efQSVx").click();

    cy.wait("@listBetsUser").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).be.eq(200);
    });
  });

  it("Não deve criar uma aposta da Mega-Sena de forma aleatória se o valor mínimo do carrinho for menor do que R$ 30,00", () => {
    cy.login();
    cy.visit("http://localhost:3000/lottery/games");
    cy.get(".bQpMQD").click();

    for (let i = 0; i < 2; i++) {
      cy.get(".sc-eJwWfJ > div > :nth-child(1)")
        .should("be.visible")
        .click({ force: true });
      cy.get(".sc-ehCJOs").should("be.visible").click({ force: true });
    }

    cy.get(".sc-efQSVx").click();

    cy.get(".Toastify__toast-body").should("exist");
  });
});
