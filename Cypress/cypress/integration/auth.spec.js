///<reference types="cypress" />

describe("Auth", () => {
  it.skip("Deve cadastrar um usuário", () => {
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

  it.skip("Deve poder realizar um login no sistema", () => {
    cy.visit("http://localhost:3000/auth/login");
    cy.get('[type="email"]').type(Cypress.env("createdUser").user.email);
    cy.get('[type="password"]').type("1234");

    cy.route("POST", "**/login").as("loginUser");

    cy.get(".sc-bdvvtL").click();

    cy.wait("@loginUser").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.request.body.email).be.not.null;
      expect(xhr.request.body.password).be.not.null;
    });
  });

  it.skip("Deve poder fazer logout", () => {
    cy.login();
    cy.get(".sc-hBUSln").click();
  });

  it("Deve poder recuperar a senha", () => {
    cy.visit("http://localhost:3000");
    cy.get(".sc-bYoBSM > a").click();

    cy.get(".sc-ezbkAF").type(Cypress.env("createdUser").user.email);

    cy.route("POST", "**/reset").as("resetUser");

    cy.get(".sc-bdvvtL").click();

    cy.wait("@resetUser").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body.email).be.not.null;
    });

    cy.get('[name="password"]').type("1234").should("have.value", "1234");
    cy.get('[name="confirmPassword"]')
      .type("1234")
      .should("have.value", "1234");

    cy.route("POST", "**/reset/*").as("changePasswordUser");

    cy.get(".sc-bdvvtL").click();

    cy.wait("@changePasswordUser").then((xhr) => {
      cy.log(xhr.response.body);
      expect(xhr.status).be.eq(200);
      expect(xhr.request.body.password).be.not.null;
    });
  });
});
