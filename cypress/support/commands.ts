/// <reference types="cypress" />

export const loginToAzureADB2C = (email: string, password: string) => {
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

export const injectGeolocationBeforeLoad = (
  win: Window,
  latitude: number = 50.45,
  longitude: number = 30.523,
  accuracy: number = 20
) => {
  if (win.navigator.permissions) {
    cy.stub(win.navigator.permissions, "query")
      .withArgs({ name: "geolocation" })
      .resolves({ state: "granted" });
  }

  const geolocationMock = {
    coords: {
      latitude,
      longitude,
      accuracy,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: Date.now(),
  };

  win.navigator.geolocation.getCurrentPosition = (success) => {
    success(geolocationMock);
  };

  win.navigator.geolocation.watchPosition = (success) => {
    success(geolocationMock);
    return 1;
  };
};

Cypress.Commands.add("interceptParkings", () => {
  cy.intercept("GET", "**/parkings/**", {
    statusCode: 200,
    body: [
      {
        id: "p1",
        name: "A Parking",
        availableSpots: 2,
        coordinates: { lat: 50.45, lng: 30.523 },
      },
      {
        id: "p2",
        name: "B Parking",
        availableSpots: 15,
        coordinates: { lat: 50.46, lng: 30.531 },
      },
      {
        id: "p3",
        name: "C Parking",
        availableSpots: 7,
        coordinates: { lat: 50.455, lng: 30.529 },
      },
    ],
  }).as("getParkings");
});

Cypress.Commands.add("interceptBookings", () => {
  cy.intercept("GET", "**/users/**/bookings", {
    statusCode: 200,
    body: {
      bookings: [
        {
          id: 1,
          carId: 12,
          userId: "u1",
          start: "2025-01-01T10:00:00Z",
          end: "2025-01-01T12:00:00Z",
          status: "active",
          parkingObj: {
            id: "p1",
            name: "Alpha Parking",
            address: "Alpha Street 10",
            coordinates: { lat: 50.45, lng: 30.523 },
            availableSpots: 4,
            totalSpots: 20,
          },
        },
        {
          id: 2,
          carId: 13,
          userId: "u1",
          start: "2025-01-03T12:00:00Z",
          end: "2025-01-03T15:00:00Z",
          status: "completed",
          parkingObj: {
            id: "p2",
            name: "Beta Parking",
            address: "Beta Avenue 55",
            coordinates: { lat: 50.455, lng: 30.527 },
            availableSpots: 0,
            totalSpots: 15,
          },
        },
      ],
    },
  }).as("getBookings");
});

Cypress.Commands.add("interceptUser", () => {
  cy.intercept("GET", "**/users/**", {
    statusCode: 200,
    body: {
      avatarUrl: null,
      createdAt: "2025-10-19T19:26:34Z",
      email: "vasys004@gmail.com",
      id: "b2983e05-4d77-4588-8ecb-fe80168b5aac",
      name: "full master",
      phoneNumber: "+380687586411",
      roles: ["user", "analyst", "moderator", "admin", "owner"],
    },
  }).as("getUser");
});

Cypress.Commands.add("interceptUserCars", () => {
  cy.intercept("GET", "**/users/**/cars", {
    statusCode: 200,
    body: {
      cars: [
        {
          id: 10,
          number: "BK3093AE",
          brand: "Opel",
          model: "x4",
          color: "White",
        },
        {
          id: 12,
          number: "BK3031AE",
          brand: "Opel",
          model: "x2",
          color: "White",
        },
        {
          id: 13,
          number: "BK3090AE",
          brand: "Opel",
          model: "X1",
          color: "Green",
        },
        {
          id: 14,
          number: "BK3094AE",
          brand: "Opel",
          model: "X5",
          color: "Green",
        },
      ],
    },
  }).as("getUserCars");
});

Cypress.Commands.add("interceptUserSubscription", () => {
  cy.intercept("GET", "**/users/**/subscription", {
    statusCode: 200,
    body: {
      tier: { name: "Premium", price: 19.99 },
      startDate: "2025-11-01T12:00:00Z",
      endDate: "2026-11-01T12:00:00Z",
      status: "active",
    },
  }).as("getUserSubscription");
});

Cypress.Commands.add("expectAuthModal", () => {
  cy.contains("Login").should("be.visible");
  cy.contains("Authorization Required").should("exist");
});

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
