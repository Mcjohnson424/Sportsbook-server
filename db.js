const Knex = require("knex");
const { Model } = require("objection");

const connection = require("./knexfile");
const config = require("./config");

// Initialize Knex
const knex = Knex(connection[config.get("env")]);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

module.exports = knex;
