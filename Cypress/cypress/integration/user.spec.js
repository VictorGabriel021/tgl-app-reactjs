///<reference types="cypress" />

describe("User", () => {
  it("Deve cadastrar um usuário", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('[type="text"]').type("Fernando");
    cy.get('[type="email"]').type(
      `victor${Cypress.env("createdUser").user.email}`
    );
    cy.get('[type="password"]').type("1234");

    cy.route("POST", "**/user/create").as("postUser");

    cy.get(".sc-bdvvtL").click();

    cy.wait("@postUser").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.request.body.name).be.not.null;
      expect(xhr.request.body.email).be.not.null;
      expect(xhr.request.body.password).be.not.null;
    });
  });

  it("Não deve cadastrar um usuário com email inválido", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('[type="text"]').type("Joana");
    cy.get('[type="email"]').type("joana@gmail");
    cy.get('[type="password"]').type("1234");

    cy.get(".sc-bdvvtL").click();

    cy.get(".sc-ikJyIC").should("exist");
  });

  it("Não deve cadastrar um usuário com senha inválida", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('[type="text"]').type("Joana");
    cy.get('[type="email"]').type("joana@gmail.com");
    cy.get('[type="password"]').type("123");

    cy.get(".sc-bdvvtL").click();

    cy.get(".sc-ikJyIC").should("exist");
  });

  it("Não deve cadastrar um usuário com nome vazio", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('[type="email"]').type("joana@gmail.com");
    cy.get('[type="password"]').type("1234");

    cy.get(".sc-bdvvtL").click();

    cy.get(".sc-ikJyIC").should("exist");
  });
});
