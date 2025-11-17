/// <reference types="cypress" />

describe("Contact Us button", () => {
  it("navigates to /contact and shows the form", () => {
    cy.visit("/");

    cy.get('[data-cy="contact-us-btn"]').click();

    cy.url().should("include", "/contact");

    cy.get('[data-cy="contact-form"]').should("be.visible");

    cy.get('[data-cy="contact-name"]').should("be.visible");
    cy.get('[data-cy="contact-email"]').should("be.visible");
    cy.get('[data-cy="contact-message"]').should("be.visible");
  });
});
