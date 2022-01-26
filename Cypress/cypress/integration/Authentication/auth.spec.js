///<reference types="cypress" />

describe("Auth", () => {
  describe("Login", () => {
    it("Não deve poder realizar um login no sistema com o email inválido", () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.get('[type="email"]').type("victor@gmail");
      cy.get('[type="password"]').type("1234");

      cy.get(".sc-bdvvtL").click();
      cy.get(".sc-ikJyIC").should("exist");
    });

    it("Não deve poder realizar um login no sistema com a senha inválida", () => {
      cy.get('[type="email"]').clear().type("victor@gmail.com");
      cy.get('[type="password"]').clear().type("123");

      cy.get(".sc-bdvvtL").click();
      cy.get(".sc-ikJyIC").should("exist");
    });

    it("Não Deve poder realizar um login no sistema passando informações que não estejam cadastradas", () => {
      cy.get('[type="email"]').clear().type("emailinvalido@gmail.com");
      cy.get('[type="password"]').clear().type("senhainvalida");

      cy.route("POST", "**/login").as("loginUser");
      cy.get(".sc-bdvvtL").click();

      cy.wait("@loginUser").then((xhr) => {
        expect(xhr.status).be.eq(401);
      });
    });

    it("Deve poder realizar um login no sistema", () => {
      cy.get('[type="email"]')
        .clear()
        .type(Cypress.env("createdUser").user.emailEdit);
      cy.get('[type="password"]').clear().type("1234");

      cy.route("POST", "**/login").as("loginUser");
      cy.get(".sc-bdvvtL").click();

      cy.wait("@loginUser").then((xhr) => {
        expect(xhr.status).be.eq(200);
        expect(xhr.request.body.email).be.not.null;
        expect(xhr.request.body.password).be.not.null;
      });
    });
  });

  describe("Logout", () => {
    it("Deve poder fazer logout", () => {
      cy.login();
      cy.get(".sc-hBUSln").click();
    });

    it("Não deve poder fazer logout", () => {
      cy.get(".sc-hBUSln").should("not.exist");
    });
  });

  describe("Recuperar senha", () => {
    it("Não deve poder recuperar a senha com o email inválido", () => {
      cy.get(".sc-bYoBSM > a").click();

      cy.get(".sc-ezbkAF").type("fausto@gmail");

      cy.get(".sc-bdvvtL").click();

      cy.get(".sc-ikJyIC").should("exist");
    });

    it("Não deve poder recuperar a senha com o email não cadastrado", () => {
      cy.get(".sc-ezbkAF").clear().type("fausto123@gmail.com");

      cy.route("POST", "**/reset").as("resetUser");
      cy.get(".sc-bdvvtL").click();

      cy.wait("@resetUser").then((xhr) => {
        cy.log(xhr.response.body);
        expect(xhr.status).be.eq(404);
      });
    });

    it("Deve poder recuperar a senha com o email cadastrado", () => {
      cy.get(".sc-ezbkAF")
        .clear()
        .type(Cypress.env("createdUser").user.emailEdit);

      cy.route("POST", "**/reset").as("resetUser");
      cy.get(".sc-bdvvtL").click();

      cy.wait("@resetUser").then((xhr) => {
        cy.log(xhr.response.body);
        expect(xhr.status).be.eq(200);
        expect(xhr.response.body.email).be.not.null;
      });
    });

    it("Não deve poder recuperar a senha com senha nova com valor inválido", () => {
      cy.get('[name="password"]').type("123");
      cy.get('[name="confirmPassword"]').type("1234");

      cy.route("POST", "**/reset/*").as("changePasswordUser");
      cy.get(".sc-bdvvtL").click();

      cy.get("form > :nth-child(2)").should("exist");
    });

    it("Não deve poder recuperar a senha com senha de confirmação com valor inválido", () => {
      cy.get('[name="password"]').clear().type("1234");
      cy.get('[name="confirmPassword"]').clear().type("123");

      cy.route("POST", "**/reset/*").as("changePasswordUser");
      cy.get(".sc-bdvvtL").click();

      cy.get("form > :nth-child(5)").should("exist");
    });

    it("Não deve poder recuperar a senha com senha nova e a senha de confirmação com valores diferentes", () => {
      cy.get('[name="password"]').clear().type("1234");
      cy.get('[name="confirmPassword"]').clear().type("12345");

      cy.route("POST", "**/reset/*").as("changePasswordUser");
      cy.get(".sc-bdvvtL").click();

      cy.get(".sc-ikJyIC").should("exist");
      cy.get("form > :nth-child(5)").should("exist");
    });

    it("Deve poder recuperar a senha com senha nova e a senha de confirmação", () => {
      cy.get('[name="password"]')
        .clear()
        .type("1234")
        .should("have.value", "1234");
      cy.get('[name="confirmPassword"]')
        .clear()
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
});
