const { defineConfig } = require("cypress");
const mochawesome = require("mochawesome");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    weatherApiToken: "64cdd78e74654955ae274322253103",
    sauceBaseUrl: "https://www.saucedemo.com/",
    sauceUsername: "standard_user",
    saucePassword: "secret_sauce",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  },
  screenshotOnRunFailure: true
});
