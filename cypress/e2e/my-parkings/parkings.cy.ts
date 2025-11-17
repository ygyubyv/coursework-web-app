/// <reference types="cypress" />

import { injectGeolocationBeforeLoad } from "../../support/commands";

const email = Cypress.env("AZURE_AD_B2C_EMAIL");
const password = Cypress.env("AZURE_AD_B2C_PASSWORD");

const login = () => {
  cy.session("b2c-session-parkings", () => {
    cy.loginToAzureADB2C(email, password);
  });
};

describe("My Parkings — initial load", () => {
  beforeEach(() => {
    login();

    cy.interceptBookings();

    cy.visit("/parkings", {
      onBeforeLoad(win) {
        injectGeolocationBeforeLoad(win, 50.45, 30.523);
      },
    });

    cy.wait("@getBookings");
  });

  // Loads bookings after API call
  it("loads user bookings", () => {
    cy.contains("Alpha Parking").should("be.visible");
    cy.contains("Beta Parking").should("be.visible");
  });
});

describe("My Parkings — filtering", () => {
  beforeEach(() => {
    login();

    cy.interceptBookings();

    cy.visit("/parkings", {
      onBeforeLoad(win) {
        injectGeolocationBeforeLoad(win, 50.45, 30.523);
      },
    });

    cy.wait("@getBookings");
  });

  // Filters by name
  it("filters by name", () => {
    cy.get("input#book-name").type("Alpha");

    cy.contains("Alpha Parking").should("exist");
    cy.contains("Beta Parking").should("not.exist");
  });

  // Filters by status: finished
  it("filters by status (finished)", () => {
    cy.get('[data-cy="filter-select"]').click();
    cy.contains("Finished").click();

    cy.contains("Beta Parking").should("exist");
    cy.contains("Alpha Parking").should("not.exist");
  });

  // Filters by status: active
  it("filters by status (active)", () => {
    cy.get('[data-cy="filter-select"]').click();
    cy.contains("Active").click();

    cy.contains("Alpha Parking").should("exist");
    cy.contains("Beta Parking").should("not.exist");
  });
});

describe("My Parkings — map interaction", () => {
  beforeEach(() => {
    login();

    cy.interceptBookings();

    cy.visit("/parkings", {
      onBeforeLoad(win) {
        injectGeolocationBeforeLoad(win, 50.45, 30.523);
      },
    });

    cy.wait("@getBookings");
  });

  // Shows parking on map
  it("shows selected parking on map", () => {
    cy.get('[data-cy="booking-item"]')
      .contains("Alpha Parking")
      .closest('[data-cy="booking-item"]')
      .within(() => {
        cy.get('[data-cy="show-on-map"]').click();
      });

    cy.get('[data-cy="book-map"]').should("exist");

    cy.get('[data-cy="parking-marker"]').should("have.length", 1);

    cy.get('[data-cy="parking-marker"]')
      .invoke("attr", "data-id")
      .should("eq", "p1");
  });
});
