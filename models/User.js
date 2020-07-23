const Model = require("./BaseModel");

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
      required: ["id", "email", "fullName"],

      properties: {
        id: { type: "string" },
        fullName: { type: ["string", "null"], minLength: 1, maxLength: 255 },
        email: { type: "string", format: "email" },
        phone: { type: ["string", "null"] },
        status: {
          type: ["string", "null"],
          enum: ["active", "banned"],
        },
        profileImageUrl: { type: ["string", "null"], format: "uri-reference" },
        birthDate: {
          type: ["string", "null"],
          format: "date",
        },
        role: {
          enum: ["admin", "user"],
        },
        customerId: { type: ["string", "null"] },
      },
    };
  }
}

module.exports = User;
