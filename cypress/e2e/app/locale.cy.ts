/// <reference types="cypress" />

describe("Locale switcher", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  // Tests switching EN → UK
  it("switches to Ukrainian (UK) and persists in localStorage", () => {
    cy.contains("button", "UK").should("be.visible").click();
    cy.contains("Увійти").should("be.visible");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("locale")).to.equal("uk");
    });
  });

  // Tests switching UK → EN
  it("switches back to English (EN) and persists in localStorage", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("locale", "uk");
    });

    cy.reload();

    cy.contains("button", "EN").should("be.visible").click();
    cy.contains("Sign in").should("be.visible");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("locale")).to.equal("en");
    });
  });
});
