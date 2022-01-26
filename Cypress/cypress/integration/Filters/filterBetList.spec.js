///<reference types="cypress" />

describe("Filter Bet List", () => {
  it("Deve selecionar o filtro Lotofácil e listar os itens correspondentes", () => {
    cy.selectFilterBetList("Lotofácil", ".cvGrbH");
  });

  it("Deve selecionar o filtro Mega-Sena e listar os itens correspondentes", () => {
    cy.selectFilterBetList("Mega-Sena", ".bQpMQD");
  });

  it("Deve selecionar o filtro Quina e listar os itens correspondentes", () => {
    cy.selectFilterBetList("Quina", ".eMSgZj");
  });

  it("Deve selecionar o filtro Timemania e listar os itens correspondentes", () => {
    cy.selectFilterBetList("Timemania", ".iJkGWL");
  });

  it("Deve selecionar o filtro NewGame e listar os itens correspondentes", () => {
    cy.selectFilterBetList("NewGame", ".gAUEcD");
  });

  it("Deve listar todos os jogos se nenhum filtro for selecionado", () => {
    cy.login();
    cy.route("GET", "**/bet/all-bets").as("getBet");

    cy.wait("@getBet").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Não deve listar os jogos se não tiver nenhum jogo cadastrado", () => {
    cy.login();
    cy.route("GET", "**/bet/all-bets").as("getBet");

    cy.wait("@getBet").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);

      if (xhr.response.body.length === 0) {
        cy.get(".alert > p").should("exist");
      }
    });
  });

  it("Não deve listar os jogos da Lotofácil se não tiver nenhum jogo cadastrado", () => {
    cy.selectFilterBetListEmpty("Lotofácil", ".cvGrbH");
  });

  it("Não deve listar os jogos da Mega-Sena se não tiver nenhum jogo cadastrado", () => {
    cy.selectFilterBetListEmpty("Mega-Sena", ".bQpMQD");
  });

  it("Não deve listar os jogos da Quina se não tiver nenhum jogo cadastrado", () => {
    cy.selectFilterBetListEmpty("Quina", ".eMSgZj");
  });

  it("Não deve listar os jogos da Timemania se não tiver nenhum jogo cadastrado", () => {
    cy.selectFilterBetListEmpty("Timemania", ".iJkGWL");
  });

  it("Não deve listar os jogos da NewGame se não tiver nenhum jogo cadastrado", () => {
    cy.selectFilterBetListEmpty("NewGame", ".gAUEcD");
  });
});
