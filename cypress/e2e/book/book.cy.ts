/// <reference types="cypress" />

import { injectGeolocationBeforeLoad } from "../../support/commands";

describe("Book page — parkings load", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.interceptParkings();
    cy.visit("/book");
    cy.wait("@getParkings");
  });

  // Verifies that parkings list is rendered after API load
  it("loads nearby parkings list", () => {
    cy.contains("Nearby Parkings").should("be.visible");

    cy.contains("h3", "A Parking").should("exist");
    cy.contains("h3", "B Parking").should("exist");
    cy.contains("h3", "C Parking").should("exist");
  });
});

describe("Book page — booking flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.interceptParkings();
  });

  // Ensures unauthenticated users see authorization modal on booking
  it("shows auth modal if user is not logged in", () => {
    cy.visit("/book");
    cy.wait("@getParkings");

    cy.contains("h3", "A Parking")
      .parent()
      .within(() => {
        cy.contains("button", "Book").click();
      });

    cy.contains("Authorization Required").should("be.visible");
  });

  // Ensures authenticated users can open parking booking modal
  it("shows booking modal if user is logged in", () => {
    const email = Cypress.env("AZURE_AD_B2C_EMAIL");
    const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

    cy.loginToAzureADB2C(email, password).then(() => {
      cy.visit("/book");
      cy.wait(2000);
      cy.wait("@getParkings");

      cy.contains("h3", "A Parking")
        .parent()
        .within(() => {
          cy.contains("button", "Book").click();
        });

      cy.contains("Book Parking").should("be.visible");
      cy.contains("A Parking").should("exist");
    });
  });
});

describe("Book page — sorting parkings", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit("/book", {
      onBeforeLoad(win) {
        injectGeolocationBeforeLoad(win, 50.45, 30.523);
      },
    });

    cy.interceptParkings();
    cy.wait("@getParkings");
  });

  // Confirms distance sorting is applied by default using user coordinates
  it("sorts by distance by default", () => {
    cy.get('[data-cy="parking-item"] h3').then(($headers) => {
      const names = [...$headers].map((el) => el.innerText.trim());
      const expectedOrder = ["A Parking", "C Parking", "B Parking"];
      expect(names).to.deep.equal(expectedOrder);
    });
  });

  // Checks that sorting can be switched to available spots
  it("sorts by available spots", () => {
    cy.get('[data-cy="parking-sort"]').click();
    cy.contains("Available spots").click();

    cy.get('[data-cy="parking-item"] h3').then(($headers) => {
      const names = [...$headers].map((el) => el.innerText.trim());
      const expectedOrder = ["B Parking", "C Parking", "A Parking"];
      expect(names).to.deep.equal(expectedOrder);
    });
  });
});
