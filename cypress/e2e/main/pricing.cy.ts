/// <reference types="cypress" />

describe("Pricing section — tier card behaviour", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="pricing-section"]').should("be.visible");
  });

  it("shows auth modal if user is not logged in", () => {
    cy.clearLocalStorage();

    cy.get('[data-cy="tier-card"]').first().click();

    cy.expectAuthModal();
  });

  it("redirects to /account/payments when user is logged in", () => {
    const email = Cypress.env("AZURE_AD_B2C_EMAIL");
    const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

    cy.loginToAzureADB2C(email, password).then(() => {
      cy.visit("/");

      cy.get('[data-cy="pricing-section"]').should("be.visible");

      cy.wait(2000);

      cy.get('[data-cy="tier-card"]').first().click();

      cy.url().should("include", "/account/payments");

      cy.contains("Payments & Billing").should("exist");
    });
  });
});
