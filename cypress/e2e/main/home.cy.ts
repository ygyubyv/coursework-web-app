/// <reference types="cypress" />

describe("Home Page", () => {
  it("should display project title", () => {
    cy.visit("/");
    cy.contains("Virodip").should("be.visible");
  });
});

describe("Main Page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("should load main page", () => {
    cy.url().should("include", "/");
  });

  it("should display header and footer", () => {
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  it("should have main content section", () => {
    cy.get("section").should("exist");
  });

  it("should display hero section", () => {
    cy.get("section").first().should("be.visible");
  });

  it("should render pricing tiers section", () => {
    cy.scrollTo("bottom", { duration: 1000 });
    cy.get("body").should("be.visible");
  });
});
