///<reference types="cypress" />

describe("Auth", () => {
  it("Deve cadastrar um usuário", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('[type="text"]').type("Fernando");
    cy.get('[type="email"]').type("fernando10@gmail.com");
    cy.get('[type="password"]').type("1234");

    cy.server();
    cy.route("POST", "**/user/create").as("postUser");

    cy.get(".sc-bdvvtL").click();

    cy.wait("@postUser").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.request.body.name).be.not.null;
      expect(xhr.request.body.email).be.not.null;
      expect(xhr.request.body.password).be.not.null;
    });
  });
});
