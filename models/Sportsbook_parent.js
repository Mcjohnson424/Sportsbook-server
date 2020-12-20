const Model = require("./BaseModel");

class Sportsbook_parent extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "sportsbook_parents";
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
        sportsbook_parent_name: { type: ["string", "null"], minLength: 1, maxLength: 255 },
      },
    };
  }
}
module.exports = Sportsbook_parent;