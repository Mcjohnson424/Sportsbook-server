exports.up = (knex) => {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists("users")
};
