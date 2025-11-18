/// <reference types="cypress" />

const email = Cypress.env("AZURE_AD_B2C_EMAIL");
const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

const login = () => {
  cy.session("b2c-account-payments", () => {
    cy.loginToAzureADB2C(email, password);
  });
};

describe("Account — Payments", () => {
  beforeEach(() => {
    login();

    cy.interceptUser();
    // cy.interceptUserTransactions();

    cy.visit("/account/payments");

    cy.wait("@getUser");
    // cy.wait("@getUserTransactions");
  });

  // Ensures tier cards render correctly
  it("renders tier cards", () => {
    cy.get('[data-cy="account-payments"]').should("exist");
    cy.get('[data-cy="tier-card"]').should("have.length", 2);
  });

  // Ensures placeholder text shows when no payment methods exist
  //   it("shows no payment methods message", () => {
  //     cy.contains("No payment methods").should("be.visible");
  //   });

  // Ensures security section is displayed
  it("renders security section", () => {
    cy.get('[data-cy="payments-security"]').should("exist");
    cy.get('[data-cy="security-features"] li').should(
      "have.length.greaterThan",
      1
    );
  });
});
