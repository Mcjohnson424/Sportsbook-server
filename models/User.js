const Model = require("./BaseModel");
const Sportsbook = require("./Sportsbook");

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "users";
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
        first_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        last_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        pw: { type: ["string","null"] },
        email: { type: "string", format: "email" },
        created_at: { type: ["string", "null"] },
        last_login: { type: ["string", "null"] },

      },
    };
  }
  static get relationMappings() {
    const Sportsbook = require("./Sportsbook");
    const Account = require("./Account");
    return {
      accounts: {
        relation: Model.HasManyRelation,
        modelClass: Account,
        join: {
          from: "users.id",
          to: "accounts.user_id"
        }
      },
      sportsbooks: {
        relation: Model.ManyToManyRelation,
        modelClass: Sportsbook,
        join: {
          from: "accounts.id",
          through: {
        
            from: "accounts.account_id",
            to: "accounts.sportsbook_id",
            extra: ["quantity", "installed"]
          },
          to: "sportsbooks.id"
        }
      }
    };
  }
}

module.exports = User;
