const Model = require("./BaseModel");

class League extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "leagues";
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
        league_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        external_id: { type: ["string","null"] },
        external_sport_id: { type: ["string","null"] },
        fanduel_id: { type: ["string", "null"] },
        draftkings_id: { type: ["string", "null"] },
        pointbet_id: { type: ["string", "null"] },
        williamhill_id: { type: ["string", "null"] },

      },
    };
  }
    static get relationMappings() {
     
      const Sport = require("./Sport");

  
      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: Sport,
          join: {
            from: "leagues.external_sport_id",
            to: "sports.external_id"
          }
        }
      }
  }
}

module.exports = League;
