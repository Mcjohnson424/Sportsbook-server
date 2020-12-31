const Model = require("./BaseModel");

class Sportsbook extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "sportsbooks";
  }
  $beforeUpdate(opt, queryContext) {
    return super.$beforeUpdate(opt, queryContext);
    this.lastUpdated = new Date();
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
        name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        state: { type: ["string","null"] },
        data_endpoint: { type: "string", format: "null" },
        login_url: { type: ["string", "null"] },
        state_id: { type: "string" },
        lastUpdated: { type: "string", format: "null" },
      },
    };
    
  }
  static get relationMappings() {
    const Account = require("./Account");
    const State = require("./State");
    return {
      accounts: {
        relation: Model.HasManyRelation,
        modelClass: Account,
        join: {
          from: "sportsbooks.id",
          to: "accounts.sportsbook_id"
        }
      },
        state: {
          relation: Model.BelongsToOneRelation,
          modelClass: State,
          join: {
            from: "sportsbooks.state_id",
            to: "states.id"
          }
        }
    };
  }
}
  

module.exports = Sportsbook;