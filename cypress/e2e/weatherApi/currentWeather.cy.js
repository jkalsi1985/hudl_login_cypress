const weatherApiToken = Cypress.env("weatherApiToken");
const { weatherSchema } = require('../weatherApi/schemaValidation');
const queryData = require('./fixture/weatherQueries.json');
const queryRequest = queryData.currentWeather;

describe('Current Weather API Test', () => {
  it('should return correct weather data with UK postcode SW1E5JL', () => {
    cy.request({
      method: 'GET',
      url: `https://api.weatherapi.com/v1/current.json?q=SW1E5JL&key=${weatherApiToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('location');
      expect(response.body.location.name).to.eq('London');
      expect(response.body.location.region).to.eq('London');
      expect(response.body.location.country).to.eq('UK');
      expect(response.body.location.tz_id).to.eq('Europe/London');

      expect(response.body).to.have.property('current');
      expect(response.body.current.condition.text).to.be.oneOf(['Sunny', 'Partly cloudy', 'Clear']);
      expect(response.body.current.temp_c).to.be.a('number');
      expect(response.body.current.wind_dir).to.eq('ENE');
      expect(response.body).to.be.jsonSchema(weatherSchema);
    });
  });

  queryRequest.forEach((query) => {
    it(`should return weather data for query: ${query.q}`, () => {
      cy.request({
        method: 'GET',
        url: `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(query.q)}&key=${weatherApiToken}`,
        headers: {
          accept: 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('location');
        expect(response.body).to.have.property('current');
        expect(response.body).to.be.jsonSchema(weatherSchema);
      });
    });
  });

  it('should return error for invalid location query', () => {
    cy.request({
      method: 'GET',
      url: `https://api.weatherapi.com/v1/current.json?q=$£$dsd&key=${weatherApiToken}`,
      headers: {
        accept: 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error.code).to.eq(1006);
      expect(response.body.error.message).to.eq('No matching location found.');
    });
  });
});


