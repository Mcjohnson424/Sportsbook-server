const Model = require("./BaseModel");

class State extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "states";
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
        state_name: { type: ["string", "null"] },
        state_abbrev: { type: ["string", "null"] },
      },
    };
  }
  static get relationMappings() {
    const Bet = require("./Bet");
    const Sportsbook = require("./Sportsbook");
    return {
      sportsbooks: {
        relation: Model.HasManyRelation,
        modelClass: Sportsbook,
        join: {
          from: "state.id",
          to: "sportsbooks.state_id"
        }
      },
      bets: {
        relation: Model.HasManyRelation,
        modelClass: Bet,
        join: {
          from: "state.id",
          to: "bets.sportsbook_state_id"
        }
      }
    };
    }
}

module.exports = State;