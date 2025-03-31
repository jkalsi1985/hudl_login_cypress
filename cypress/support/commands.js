import { logInPage, burgerMenuList, productList, shoppingCart } from "./pageObjects";
import './commands';

// -- Navigate to Sauce Labs page --
Cypress.Commands.add("navigateToSauceLabPage", () => {
  cy.visit(Cypress.env("sauceBaseUrl"));
  cy.contains("Swag Labs");
});

// -- Login command --
Cypress.Commands.add("loginSuccessfullyIntoSauceLab", (email, password) => {
  cy.get(logInPage.usernameField).clear().type(email);
  cy.get(logInPage.passwordField).clear().type(password);
  cy.get(logInPage.loginButton).click();
});

// -- Logout command --
Cypress.Commands.add("logoutSuccessfully", () => {
  cy.get(burgerMenuList.burgerMenuButton).click();
  cy.get(burgerMenuList.logOutButton).contains("Logout").should("be.visible");
  cy.get(burgerMenuList.logOutButton).click();
  cy.url().should("contain", Cypress.env("sauceBaseUrl"));
});

// -- Add backpack to cart --
Cypress.Commands.add("addSauceLabBackPackToShoppingCart", () => {
  cy.get(productList.addSauceLabBackPackToCartButton).click();
});

// -- View shopping cart --
Cypress.Commands.add("clickToViewShoppingCart", () => {
  cy.get(shoppingCart.shoppingCartButton).click();
  cy.url().should("contain", "https://www.saucedemo.com/cart.html");
});