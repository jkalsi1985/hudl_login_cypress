import { productList, shoppingCart } from "../support/pageObjects";

const username = Cypress.env("sauceUsername");
const password = Cypress.env("saucePassword");

describe("Sauce Lab E2E Flow", () => {
  beforeEach(() => {
    cy.navigateToSauceLabPage();
  });

  afterEach(() => {
    cy.logoutSuccessfully();
  });

  it("login succcessfully without remember me ticked", () => {
    cy.loginSuccessfullyIntoSauceLab(username, password);
    cy.url().should(
      "contain",
      "https://www.saucedemo.com/inventory.html"
    );
  });

  it("add sauce labs backpack to the shopping cart successfully", () => {

    // Login successfully
    cy.loginSuccessfullyIntoSauceLab(username, password);
    cy.url().should(
      "contain",
      "https://www.saucedemo.com/inventory.html"
    );

    // Add Sauce Labs Backpack to shopping cart
    cy.addSauceLabBackPackToShoppingCart();
    cy.get(productList.inventoryItemPrice)
      .should('be.visible')
      .and('contain', '$29.99');
    cy.get(productList.addToCartButton).should("not.exist");
    cy.get(productList.removeSauceLabBackPackButton).should("be.visible");

    // View the shopping cart
    cy.clickToViewShoppingCart();
    cy.get(productList.inventoryItemName).should("contain", "Sauce Labs Backpack");
    cy.get('.inventory_item_price')
    .should('be.visible')
    .then(($price) => {
      const priceText = $price.text();
      try {
        expect(priceText).to.include('$');
        const priceValue = parseFloat(priceText.replace('$', ''));
        expect(priceValue).to.be.lessThan(50);
      } catch (error) {
        cy.log('Price validation failed: ' + error.message);
        throw error;
      }
    });
  
    cy.get(shoppingCart.checkoutButton).should("be.visible");
    cy.get(shoppingCart.removeButton).should("be.visible");
    cy.get(shoppingCart.continueButton).should("be.visible");
  });
});
