/// <reference types="cypress" />

describe("Book page — parkings load", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept("GET", "**/parkings/**", {
      statusCode: 200,
      body: [
        {
          id: "demo-1",
          name: "Demo Parking",
          address: "123 Demo St",
          availableSpots: 5,
          coordinates: { lat: 50.45, lng: 30.523 },
        },
      ],
    }).as("getParkings");

    cy.visit("/book");
    cy.wait("@getParkings");
    cy.contains("Nearby Parkings").should("be.visible");
  });

  it("shows auth modal if user is not logged in", () => {
    cy.contains("h3", "Demo Parking")
      .parent()
      .within(() => {
        cy.contains("button", "Book").click();
      });

    cy.contains("Login").should("be.visible");
    cy.contains("Authorization Required").should("exist");
  });

  it("shows booking modal if user is logged in", () => {
    const email = Cypress.env("azure_ad_b2c_email");
    const password = Cypress.env("azure_ad_b2c_password");

    cy.loginToAzureADB2C(email, password).then(() => {
      cy.visit("/book");
      cy.wait(2000);
      cy.wait("@getParkings");

      cy.contains("h3", "Demo Parking")
        .parent()
        .within(() => {
          cy.contains("button", "Book").click();
        });

      cy.contains("Book Parking").should("be.visible");
      cy.contains("Demo Parking").should("exist");
      cy.wait(2000);
    });
  });
});
