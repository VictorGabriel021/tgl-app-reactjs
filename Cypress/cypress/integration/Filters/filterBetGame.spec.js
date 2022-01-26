///<reference types="cypress" />

describe("Filter Bet Game", () => {
  it("Deve carregar as informações dos filtros", () => {
    cy.login();
    cy.get(":nth-child(1) > .sc-bqiRlB > a").click();

    cy.route("GET", "**/cart_games").as("getFilterBet");

    cy.get(":nth-child(4) > .sc-bdvvtL").click();

    cy.wait("@getFilterBet").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Deve carregar as informações do filtro selecionado", () => {
    cy.selectFilterBetGame(".cvGrbH", ".sc-gWXbKe", "NEW BET FOR Lotofácil");
  });

  it("Deve carregar as informações do filtro selecionado", () => {
    cy.selectFilterBetGame(".bQpMQD", ".sc-gWXbKe", "NEW BET FOR Mega-Sena");
  });

  it("Deve carregar as informações do filtro selecionado", () => {
    cy.selectFilterBetGame(".eMSgZj", ".sc-gWXbKe", "NEW BET FOR Quina");
  });

  it("Deve carregar as informações do filtro selecionado", () => {
    cy.selectFilterBetGame(".iJkGWL", ".sc-gWXbKe", "NEW BET FOR Timemania");
  });

  it("Deve carregar as informações do filtro selecionado", () => {
    cy.selectFilterBetGame(".gAUEcD", ".sc-gWXbKe", "NEW BET FOR NewGame");
  });
});
