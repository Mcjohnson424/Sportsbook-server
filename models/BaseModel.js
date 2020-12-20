const { Model } = require("objection");
const each = require("lodash/each");
const format = require("date-fns/format");

const DATE_FORMAT = "yyyy-MM-dd";

const formatDate = (value) => format(value, DATE_FORMAT);

class BaseModel extends Model {
  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);
    each(this.constructor.jsonSchema.properties, (schema, prop) => {
      if (schema.format === "date") {
        json[prop] = json[prop] && formatDate(json[prop]);
      }
    });
    return json;
  }
}
module.exports = BaseModel;
