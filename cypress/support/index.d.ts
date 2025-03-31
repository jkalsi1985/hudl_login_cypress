/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      navigateToSauceLabPage(): Chainable<void>;
      loginSuccessfullyIntoSauceLab(username: string, password: string): Chainable<void>;
      logoutSuccessfully(): Chainable<void>;
      addSauceLabBackPackToShoppingCart(): Chainable<void>;
      clickToViewShoppingCart(): Chainable<void>;
    }
}