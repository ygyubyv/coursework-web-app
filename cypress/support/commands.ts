/// <reference types="cypress" />

const loginToAzureADB2C = (email: string, password: string) => {
  const azureADB2CTenantName = Cypress.env("AZURE_AD_B2C_TENANT_NAME");

  cy.visit("/");
  cy.get("button")
    .contains(/Sign in/i)
    .click();

  cy.origin(
    `https://${azureADB2CTenantName}.b2clogin.com`,
    { args: { email, password } },
    ({ email, password }) => {
      cy.get('input[type="email"]', { timeout: 15000 }).should("be.visible");

      cy.wait(2000);
      cy.get('input[type="email"]').type(email, { delay: 100 });

      cy.get('input[type="password"]', { timeout: 15000 }).should("be.visible");

      cy.wait(1000);
      cy.get('input[type="password"]').type(password, {
        log: false,
        delay: 100,
      });

      cy.get('input[type="password"]').type("{enter}");
      cy.wait(10000);
    }
  );
};

Cypress.Commands.add("loginToAzureADB2C", (email: string, password: string) => {
  cy.session(
    `b2c-${email}`,
    () => {
      loginToAzureADB2C(email, password);
    },
    {
      validate: () => {
        cy.get('img[alt="Profile"]', { timeout: 10000 })
          .first()
          .should("be.visible")
          .click();
        cy.get("button")
          .contains(/Sign out/i)
          .should("exist");
      },
    }
  );
});
