///<reference types="cypress" />

describe("Filter Bet List", () => {
  it("Deve selecionar o filtro Lotofácil e listar os itens correspondentes", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Lotofácil").as("getBetFiltered");

    cy.get(".cvGrbH").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Deve selecionar o filtro Mega-Sena e listar os itens correspondentes", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Mega-Sena").as("getBetFiltered");

    cy.get(".bQpMQD").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Deve selecionar o filtro Quina e listar os itens correspondentes", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Quina").as("getBetFiltered");

    cy.get(".eMSgZj").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Deve selecionar o filtro Timemania e listar os itens correspondentes", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Timemania").as("getBetFiltered");

    cy.get(".iJkGWL").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Deve selecionar o filtro NewGame e listar os itens correspondentes", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=NewGame").as("getBetFiltered");

    cy.get(".gAUEcD").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Deve listar todos os jogos se nenhum filtro for selecionado", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets").as("getBet");

    cy.wait("@getBet").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);
    });
  });

  it("Não deve listar os jogos se não tiver nenhum jogo cadastrado", () => {
    cy.login();
    cy.visit("http://localhost:3000");

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
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Lotofácil").as("getBetFiltered");

    cy.get(".cvGrbH").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);

      if (xhr.response.body.length === 0) {
        cy.get(".alert > p").should("exist");
      }
    });
  });

  it("Não deve listar os jogos da Mega-Sena se não tiver nenhum jogo cadastrado", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Mega-Sena").as("getBetFiltered");

    cy.get(".bQpMQD").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);

      if (xhr.response.body.length === 0) {
        cy.get(".alert > p").should("exist");
      }
    });
  });

  it("Não deve listar os jogos da Quina se não tiver nenhum jogo cadastrado", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Quina").as("getBetFiltered");

    cy.get(".eMSgZj").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);

      if (xhr.response.body.length === 0) {
        cy.get(".alert > p").should("exist");
      }
    });
  });

  it("Não deve listar os jogos da Timemania se não tiver nenhum jogo cadastrado", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=Timemania").as("getBetFiltered");

    cy.get(".iJkGWL").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);

      if (xhr.response.body.length === 0) {
        cy.get(".alert > p").should("exist");
      }
    });
  });

  it("Não deve listar os jogos da NewGame se não tiver nenhum jogo cadastrado", () => {
    cy.login();
    cy.visit("http://localhost:3000");

    cy.route("GET", "**/bet/all-bets?type[]=NewGame").as("getBetFiltered");

    cy.get(".gAUEcD").click();

    cy.wait("@getBetFiltered").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).to.eq(200);

      if (xhr.response.body.length === 0) {
        cy.get(".alert > p").should("exist");
      }
    });
  });
});
