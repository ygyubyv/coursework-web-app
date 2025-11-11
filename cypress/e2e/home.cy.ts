/// <reference types="cypress" />

describe("Home Page", () => {
  it("should display project title", () => {
    cy.visit("/");
    cy.contains("Virodip").should("be.visible");
  });
});
