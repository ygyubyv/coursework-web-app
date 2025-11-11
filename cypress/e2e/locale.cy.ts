/// <reference types="cypress" />

describe("Locale switcher", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("switches to Ukrainian (UK) and persists in localStorage", () => {
    cy.contains("button", "UK").should("be.visible").click();
    cy.contains("Увійти").should("be.visible");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("locale")).to.equal("uk");
    });
  });

  it("switches back to English (EN) and persists in localStorage", () => {
    cy.contains("button", "UK").click();
    cy.contains("Увійти").should("be.visible");

    cy.contains("button", "EN").should("be.visible").click();

    cy.contains("Sign in").should("be.visible");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("locale")).to.equal("en");
    });
  });
});
