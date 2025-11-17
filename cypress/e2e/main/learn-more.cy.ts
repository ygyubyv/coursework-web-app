/// <reference types="cypress" />

describe("Learn more button", () => {
  it("scrolls to the How It Works section", () => {
    cy.visit("/");

    cy.get('[data-cy="learn-more-btn"]').click();

    cy.wait(1000);

    cy.get('[data-cy="how-it-works"]')
      .should("be.visible")
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.greaterThan(-10);
        expect(rect.top).to.be.lessThan(200);
      });
  });
});
