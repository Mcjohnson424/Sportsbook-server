const Model = require("./BaseModel");
const Sportsbook_parent = require("./Sportsbook_parent");

class Bet_subtype extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "bet_subtypes";
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
        bet_subtype_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        sportsbook_parent_id: { type: "string" },
        bet_type_id: { type: "string" },

      },
    };
  }
  static get relationMappings() {
    const Bet_type = require("./Bet_type");
    const Sportsbook_parent = require("./Sportsbook_parent");

    return {
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bet_type,
        join: {
          from: "bet_subtype.bet_type_id",
          to: "bet_type.id"
        }
      },
      sportsbook_parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sportsbook_parent,
        join: {
          from: "bet_subtype.sportsbook_parent_id",
          to: "sportsbook_parents.id"
        }
      }
    }
  }
}
module.exports = Bet_subtype;