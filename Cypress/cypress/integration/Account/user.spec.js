///<reference types="cypress" />

describe("User", () => {
  it("Não deve cadastrar um usuário com email inválido", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('[type="text"]').type("Joana");
    cy.get('[type="email"]').type("joana@gmail");
    cy.get('[type="password"]').type("1234");

    cy.get(".sc-bdvvtL").click();
    cy.get(".sc-ikJyIC").should("exist");
  });

  it("Não deve cadastrar um usuário com senha inválida", () => {
    cy.get('[type="email"]').clear().type("joana@gmail.com");
    cy.get('[type="password"]').clear().type("123");

    cy.get(".sc-bdvvtL").click();
    cy.get(".sc-ikJyIC").should("exist");
  });

  it("Não deve cadastrar um usuário com campos vazios", () => {
    cy.get('[type="text"]').clear();
    cy.get('[type="email"]').clear();
    cy.get('[type="password"]').clear();

    cy.get(".sc-bdvvtL").click();
    cy.get(".sc-ikJyIC").should("exist");
  });

  it("Não deve cadastrar um usuário com um email que já existe", () => {
    cy.get('[type="text"]').type("André");
    cy.get('[type="email"]').type("victor@gmail.com");
    cy.get('[type="password"]').type("1234");

    cy.route("POST", "**/user/create").as("postUser");
    cy.get(".sc-bdvvtL").click();

    cy.wait("@postUser").then((xhr) => {
      expect(xhr.status).be.eq(400);
      expect(xhr.request.body.name).be.not.null;
      expect(xhr.request.body.email).be.not.null;
      expect(xhr.request.body.password).be.not.null;
      cy.get(".sc-ikJyIC").should("exist");
    });
  });

  it("Deve cadastrar um usuário", () => {
    cy.get('[type="email"]').clear().type(`andrefelipe10005@gmail.com`);

    cy.route("POST", "**/user/create").as("postUser");
    cy.get(".sc-bdvvtL").click();

    cy.wait("@postUser").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.request.body.name).be.not.null;
      expect(xhr.request.body.email).be.not.null;
      expect(xhr.request.body.password).be.not.null;
      cy.createUser(xhr.response.body);
    });
  });

  it("Deve exibir as informações do usuário logado", () => {
    cy.login();
    cy.route("GET", "**/user/my-account").as("getUser");
    cy.get(".sc-ksdxgE > a").click();

    cy.wait("@getUser").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body.name).be.not.null;
      expect(xhr.response.body.email).be.not.null;
      expect(xhr.response.body.created_at).be.not.null;
      expect(xhr.response.body.bets).be.not.null;
    });
  });

  it("Deve poder editar as informações do usuário", () => {
    cy.login();
    cy.get(".sc-ksdxgE > a").click();
    cy.get(".sc-hGPBjI").click();

    cy.get('[type="text"]').clear().type("Igor");
    cy.get('[type="email"]').clear().type("igor@gmail.com");
    cy.get(".btn").click();

    cy.get(".Toastify__toast-body").should("exist");

    Cypress.env("createdUser").user.emailEdit = "igor@gmail.com";
  });

  it("Não deve poder editar as informações do usuário se o email digitado for inválido", () => {
    cy.login();
    cy.get(".sc-ksdxgE > a").click();
    cy.get(".sc-hGPBjI").click();

    cy.get('[type="email"]').clear().type("gloria12@email");
    cy.get(".btn").click();
    cy.get(".sc-kfPuZi").should("exist");
  });

  it("Não deve poder editar as informações do usuário se o nome digitado for inválido", () => {
    cy.get('[type="text"]').clear().type("Ivo");
    cy.get('[type="email"]').clear().type("gloria12@gmail.com");
    cy.get(".btn").click();
    cy.get(".sc-kfPuZi").should("exist");
  });
});
