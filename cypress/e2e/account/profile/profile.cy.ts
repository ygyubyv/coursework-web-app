/// <reference types="cypress" />

const email = Cypress.env("AZURE_AD_B2C_EMAIL");
const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

const login = () => {
  cy.session("b2c-account-profile", () => {
    cy.loginToAzureADB2C(email, password);
  });
};

describe("Account — Personal Information", () => {
  beforeEach(() => {
    login();
    cy.interceptUser();
    cy.interceptUserCars();
    // cy.interceptUserSubscription();

    cy.visit("/account/profile");

    cy.wait("@getUser");
    cy.wait("@getUserCars");
    // cy.wait("@getUserSubscription");
  });

  // Ensures core profile fields render correctly
  it("loads personal information", () => {
    cy.get('[data-cy="account-profile"]').should("exist");

    cy.get('[data-cy="stat-full-name"]').should("contain", "full master");
    cy.get('[data-cy="stat-email"]').should("contain", "vasys004@gmail.com");
    cy.get('[data-cy="stat-phone"]').should("contain", "+380687586411");
    cy.get('[data-cy="stat-joined"]').should("contain", "2025");
  });

  // Ensures user cars list loads from API
  it("loads user cars list", () => {
    cy.get('[data-cy="car-item"]').should("have.length", 4);

    cy.contains("BK3093AE").should("exist");
    cy.contains("BK3031AE").should("exist");
    cy.contains("BK3090AE").should("exist");
    cy.contains("BK3094AE").should("exist");
  });

  // Ensures subscription block displays correct details
  // it("loads subscription info", () => {
  //   cy.get('[data-cy="subscription-title"]').should("contain", "Current plan");

  //   cy.contains("Premium").should("exist");
  //   cy.contains("$19.99").should("exist");
  //   cy.contains("active").should("exist");
  // });
});
