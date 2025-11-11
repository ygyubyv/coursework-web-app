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
          coordinates: {
            lat: 50.45,
            lng: 30.523,
          },
        },
      ],
    }).as("getParkings");

    cy.visit("/book");
  });

  it("loads parkings and displays them", () => {
    cy.wait("@getParkings");

    cy.contains("Nearby Parkings").should("be.visible");

    cy.contains("h3", "Demo Parking").should("be.visible");

    cy.contains("button", "Book").should("be.visible");
  });
});
