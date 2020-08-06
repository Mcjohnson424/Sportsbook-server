const Model = require("./BaseModel");

class Account extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "accounts";
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
        username: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        state: { type: ["string", "null"] },
        hashed_pw: { type: ["string","null"] },
        created_at: { type: ["string", "null"] },
        last_check: { type: ["string", "null"] },
        user_id: { type: "string" },
        sportsbook_id: { type: "string" },

      },
    };
  }
  static get relationMappings() {
    const User = require("./User");
    const Sportsbook = require("./Sportsbook");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "accounts.user_id",
          to: "users.id"
        }
      },
      sportsbook: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sportsbook,
        join: {
          from: "accounts.sportsbook_id",
          to: "sportsbooks.id"
        }
      }
     
    };
  }
}

module.exports = Account;
