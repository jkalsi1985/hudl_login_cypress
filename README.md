## Description of this task
The purpose of this task to implement and focus on two areas:
1. RestAPI Auotmation on https://www.weatherapi.com/ 
2. UI Automation on https://www.saucedemo.com/

The project was implement on a Mac using Cypress in Javascript because makes it easier to test the API and UI, easy to debug to tests and you can inspect elements at run time.

## Pre-requisites
- node (https://nodejs.org/en/download)
- cypress (https://docs.cypress.io/guides/getting-started/installing-cypress)

## Instructions to run automation tests
- On a Mac
  - run `npm install` to install dependencies
  - To run on multiple browsers: `npx cypress run --browser chrome` or `npx cypress run --browser electron`
  - Run and genearte HTML report:
      To install `npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator`
      `npx cypress run`
      `npx mochawesome-merge cypress/reports/*.json > merged-report.json`
      `npx marge merged-report.json`

## Scenarios covered

Scenario 1 and 2 - are covered in `weatherApi` folder
Scenario 3 and 4 - are covered in `saucedemo.cy`, `cypress.config.js` and `package.json`


## Comments/Improvements
- Check responsivness:
* Use `cy.viewport(550, 750)` to test different screen resolution and different devices
* Accessibility testing - this will be manual testing with voiceOver, text-to-speech etc
* `"localtime_epoch"` - Investigate why value keep changing
* Add unit tests to check the error response ie locked_out_user, problem_user not suitable for UI auotmation.
* Apply `cy.log()` on each commands so that easier to debug when a test fail
* Apply cypress config apply `video: true`