/// <reference types="cypress" />

describe("Authentication flow", () => {
  it("logs in successfully via Azure AD B2C", () => {
    const email = Cypress.env("AZURE_AD_B2C_EMAIL");
    const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

    cy.loginToAzureADB2C(email, password);
  });
});
