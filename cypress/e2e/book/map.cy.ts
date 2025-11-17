/// <reference types="cypress" />

import { injectGeolocationBeforeLoad } from "../../support/commands";

describe("Book page — map loading", () => {
  beforeEach(() => {
    cy.visit("/book", {
      onBeforeLoad(win) {
        injectGeolocationBeforeLoad(win, 50.45, 30.523);
      },
    });
  });

  // Checks that the Google Map container renders correctly
  it("loads the map container", () => {
    cy.get('[data-cy="book-map"]', { timeout: 10000 })
      .should("exist")
      .and("be.visible");
  });

  // Verifies that the user's location marker is visible on the map
  it("renders user location marker", () => {
    cy.get('[data-cy="user-marker"]', { timeout: 10000 })
      .should("exist")
      .and("be.visible");
  });

  // Ensures that parking markers are rendered for available parkings
  it("renders parking markers", () => {
    cy.get('[data-cy="parking-marker"]', { timeout: 10000 })
      .should("exist")
      .and("have.length.greaterThan", 0);
  });
});

describe("Book page — destination & route", () => {
  beforeEach(() => {
    cy.visit("/book", {
      onBeforeLoad(win) {
        injectGeolocationBeforeLoad(win, 50.45, 30.523);
      },
    });
  });

  // Shows info popup when clicking parking marker
  it("opens parking info when marker is clicked", () => {
    cy.get('[data-cy="parking-marker"]', { timeout: 10000 })
      .first()
      .click({ force: true });

    cy.get('[data-cy="parking-info"]').should("exist");
  });

  // Builds a route when clicking the Follow button
  it("builds a route to the selected parking", () => {
    cy.get('[data-cy="parking-marker"]', { timeout: 10000 })
      .first()
      .click({ force: true });

    cy.get('[data-cy="parking-info"]').should("exist");

    cy.get('[data-cy="follow-button"]').click({ force: true });

    cy.get('[data-cy="route-panel"]', { timeout: 10000 }).should("exist");
  });

  // Clears route panel when clicking clear button
  it("clears the route when clicking clear button", () => {
    cy.get('[data-cy="parking-marker"]', { timeout: 10000 })
      .first()
      .click({ force: true });

    cy.get('[data-cy="follow-button"]').click({ force: true });

    cy.get('[data-cy="route-panel"]').should("exist");

    cy.get('[data-cy="clear-route"]').click({ force: true });

    cy.get('[data-cy="route-panel"]').should("not.exist");
  });
});
