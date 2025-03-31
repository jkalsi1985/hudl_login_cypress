const weatherApiToken = Cypress.env("weatherApiToken");
const queryData = require('./fixture/weatherQueries.json');
const queryRequest = queryData.timezoneWeather;

describe('Timezone Weather API Test', () => {
  it('should return correct timezone weather data with UK postcode SW1E5JL', () => {
    cy.request({
      method: 'GET',
      url: `https://api.weatherapi.com/v1/timezone.json?q=SW1E5JL&key=${weatherApiToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('location');
  
      const location = response.body.location;
      expect(location.name).to.eq('London');
      expect(location.region).to.eq('London');
      expect(location.country).to.eq('UK');
      expect(location.lat).to.eq(51.4970016479492);
      expect(location.lon).to.eq(-0.137999996542931);
      // expect(location.localtime_epoch).to.eq(1743410712);
      expect(location.tz_id).to.eq('Europe/London');
    });
  });

  it('should return correct timezone weather data with Canada postcode M5V2Z2', () => {
    cy.request({
      method: 'GET',
      url: `https://api.weatherapi.com/v1/timezone.json?q=M5V2Z2&key=${weatherApiToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('location');
  
      const location = response.body.location;
      expect(location.name).to.eq('Toronto');
      expect(location.region).to.eq('');
      expect(location.country).to.eq('Canada');
      expect(location.lat).to.eq(43.6514015197754);
      expect(location.lon).to.eq(-79.3825988769531);
      // expect(location.localtime_epoch).to.eq(1743411334);
      expect(location.tz_id).to.eq('America/Toronto');
    });
  });

  it('should return correct timezone weather data with US postcode 90045', () => {
    cy.request({
      method: 'GET',
      url: `https://api.weatherapi.com/v1/timezone.json?q=90045&key=${weatherApiToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('location');
  
      const location = response.body.location;
      expect(location.name).to.eq('Los Angeles');
      expect(location.region).to.eq('California');
      expect(location.country).to.eq('USA');
      expect(location.lat).to.eq(33.9631004333496);
      expect(location.lon).to.eq(-118.393997192383);
      // expect(location.localtime_epoch).to.eq(1743411334);
      expect(location.tz_id).to.eq('America/Los_Angeles');
    });
  });

  queryRequest.forEach((query) => {
    it(`should return weather data for query: ${query.q}`, () => {
      cy.request({
        method: 'GET',
        url: `https://api.weatherapi.com/v1/timezone.json?q=${encodeURIComponent(query.q)}&key=${weatherApiToken}`,
        headers: {
          accept: 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('location');
  
        const location = response.body.location;
        expect(location.region).to.eq('Hampshire');
        expect(location.country).to.eq('United Kingdom');
        expect(location.tz_id).to.eq('Europe/London');
      });
    });
  });
  

  it('should return error for invalid location query', () => {
    cy.request({
      method: 'GET',
      url: `https://api.weatherapi.com/v1/timezone.json?q=324234&key=${weatherApiToken}`,
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


