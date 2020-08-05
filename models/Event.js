const Model = require("./BaseModel");

class Event extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "events";
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: "object",
      required: [],

      properties: {
        id: { type: ["string", "null"] },
        event_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        home_team: { type: ["string","null"] },
        away_team: { type: ["string","null"] },
        event_date_time: { type: ["string", "null"], format: "date-time" },
        external_id: { type: ["string","null"] },
        external_league_id: { type: ["string","null"] },
        league_name: { type: ["string", "null"] },
        external_sport_id: { type: ["string","null"] },
        sports_name: { type: ["string","null"] },
        fanduel_id: { type: ["string", "null"] },
        draftkings_id: { type: ["string", "null"] },
        pointbet_id: { type: ["string", "null"] },
        williamhill_id: { type: ["string", "null"] },

      },
    };
  }
}

module.exports = Event;
