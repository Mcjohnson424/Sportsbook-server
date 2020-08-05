const Model = require("./BaseModel");

class Bet_type extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "bet_types";
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
        bet_type_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        external_id: { type: ["string","null"] },
        fanduel_id: { type: ["string", "null"] },
        draftkings_id: { type: ["string", "null"] },
        pointbet_id: { type: ["string", "null"] },
        williamhill_id: { type: ["string", "null"] },

      },
    };
  }
}

module.exports = Bet_type;
