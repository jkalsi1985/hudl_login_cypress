const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

// Scenario 2: Data validation against the schema which will test in currentWeather test.
const weatherSchema = {
  type: "object",
  required: ["location", "current"],
  properties: {
    location: {
      type: "object",
      required: ["name", "region", "country", "tz_id"],
      properties: {
        name: { type: "string" },
        region: { type: "string" },
        country: { type: "string" },
        tz_id: { type: "string" },
      },
    },
    current: {
      type: "object",
      required: ["temp_c", "condition"],
      properties: {
        temp_c: { type: "number" },
        condition: {
          type: "object",
          required: ["text"],
          properties: {
            text: { type: "string" },
          },
        },
      },
    },
  },
};

module.exports = { weatherSchema };
