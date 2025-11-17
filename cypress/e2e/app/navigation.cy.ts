/// <reference types="cypress" />

describe("Routing — direct access to routes", () => {
  it("opens main page at /", () => {
    cy.visit("/");
    cy.contains("Virodip").should("be.visible");
  });

  it("opens about page at /about", () => {
    cy.visit("/about");
    cy.contains("Empty for now").should("be.visible");
  });

  it("opens FAQ page at /faq", () => {
    cy.visit("/faq");
    cy.contains("Empty for now").should("be.visible");
  });

  it("opens help page at /help", () => {
    cy.visit("/help");
    cy.contains("Empty for now").should("be.visible");
  });

  it("opens contact page at /contact", () => {
    cy.visit("/contact");
    cy.url().should("include", "/contact");

    cy.get('[data-cy="contact-form"]').should("be.visible");

    cy.get('[data-cy="contact-name"]').should("be.visible");
    cy.get('[data-cy="contact-email"]').should("be.visible");
    cy.get('[data-cy="contact-message"]').should("be.visible");
  });

  it("opens book page at /book", () => {
    cy.visit("/book");
    cy.contains("Nearby Parkings").should("be.visible");
  });
});

describe("Routing — authenticated navigation", () => {
  const email = Cypress.env("AZURE_AD_B2C_EMAIL");
  const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

  const login = () => {
    cy.session("b2c-session", () => {
      cy.loginToAzureADB2C(email, password);
    });
  };

  beforeEach(() => {
    login();
    cy.visit("/");
  });

  const openProfileMenu = () => {
    cy.get('img[alt="Profile"]', { timeout: 15000 })
      .first()
      .should("be.visible")
      .click();
  };

  it("navigates to My Parkings from profile menu", () => {
    openProfileMenu();
    cy.contains("span", "My Parkings").click();
    cy.url().should("include", "/parkings");
  });

  it("navigates to Book from profile menu", () => {
    openProfileMenu();
    cy.contains("span", "Reserve").click();
    cy.url().should("include", "/book");
  });

  it("navigates to Account from profile menu", () => {
    openProfileMenu();
    cy.contains("span", "Account").click();
    cy.url().should("include", "/account");
  });

  it("navigates between account subsections via sidebar", () => {
    cy.visit("/account");
    cy.contains("a", "Personal Info").click();
    cy.url().should("include", "/account/profile");
  });
});
