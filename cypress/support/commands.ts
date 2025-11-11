/// <reference types="cypress" />

// const loginToAzureADB2C = (email: string, password: string) => {
//   const azureADB2CTenantName = Cypress.env("azure_ad_b2c_tenant_name");

//   cy.visit("/");
//   cy.get("button")
//     .contains(/Sign in/i)
//     .click();

//   cy.origin(
//     `https://${azureADB2CTenantName}.b2clogin.com`,
//     { args: { email, password } },
//     ({ email, password }) => {
//       cy.get('input[type="email"]', { timeout: 15000 }).should("be.visible");

//       cy.wait(5000);
//       cy.get('input[type="email"]').type(email, { delay: 300 });

//       cy.get('button[type="submit"]').should("be.enabled").click();

//       cy.get('input[type="password"]', { timeout: 15000 }).should("be.visible");

//       cy.wait(1000);
//       cy.get('input[type="password"]').type(password, {
//         log: false,
//         delay: 300,
//       });

//       cy.get('input[type="password"]').type("{enter}");
//     }
//   );

//   cy.url({ timeout: 10000 }).should("include", "/");
// };

// Cypress.Commands.add("loginToAzureADB2C", (email: string, password: string) => {
//   cy.session(
//     `b2c-${email}`,
//     () => {
//       loginToAzureADB2C(email, password);
//     },
//     {
//       validate: () => {
//         cy.visit("/");
//         cy.url().should("include", "/");
//         cy.get('img[alt="Profile"]').click();
//         cy.get("button")
//           .contains(/Sign out/i)
//           .should("exist");
//       },
//     }
//   );
// });
