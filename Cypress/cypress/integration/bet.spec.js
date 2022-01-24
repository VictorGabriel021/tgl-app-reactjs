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

  it("Não deve criar uma aposta da Mega-Sena se o valor mínimo do carrinho for menor do que R$ 30,00", () => {
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

  it("Não deve adicionar mais números que o permitido na aposta da Mega-Sena", () => {
    cy.login();
    cy.visit("http://localhost:3000/lottery/games");
    cy.get(".bQpMQD").click();

    cy.get("#1").should("be.visible").click({ force: true });
    cy.get("#2").should("be.visible").click({ force: true });
    cy.get("#3").should("be.visible").click({ force: true });
    cy.get("#4").should("be.visible").click({ force: true });
    cy.get("#5").should("be.visible").click({ force: true });
    cy.get("#6").should("be.visible").click({ force: true });
    cy.get("#7").should("be.visible").click({ force: true });

    cy.get(".Toastify__toast-body > :nth-child(2)").should("exist");
  });

  it("Não deve adicionar menos números que o permitido na aposta da Mega-Sena", () => {
    cy.login();
    cy.visit("http://localhost:3000/lottery/games");
    cy.get(".bQpMQD").click();

    cy.get("#1").should("be.visible").click({ force: true });
    cy.get("#2").should("be.visible").click({ force: true });
    cy.get("#3").should("be.visible").click({ force: true });
    cy.get("#4").should("be.visible").click({ force: true });
    cy.get("#5").should("be.visible").click({ force: true });

    cy.get(".sc-ehCJOs").click({ force: true });
    cy.get(".Toastify__toast-body > :nth-child(2)").should("exist");
  });

  it("Não deve adicionar o mesmo jogo da Mega-Sena", () => {
    cy.login();
    cy.visit("http://localhost:3000/lottery/games");
    cy.get(".bQpMQD").click();

    for (let i = 0; i < 2; i++) {
      cy.get("#1").should("be.visible").click({ force: true });
      cy.get("#2").should("be.visible").click({ force: true });
      cy.get("#3").should("be.visible").click({ force: true });
      cy.get("#4").should("be.visible").click({ force: true });
      cy.get("#5").should("be.visible").click({ force: true });
      cy.get("#6").should("be.visible").click({ force: true });
      cy.get(".sc-ehCJOs").click({ force: true });
    }
    cy.get(".Toastify__toast-body > :nth-child(2)").should("exist");
  });
});
