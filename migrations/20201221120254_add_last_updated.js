exports.up = function (knex) {
  return knex.schema.alterTable("sportsbooks", (table) => {
    table.dateTime("lastUpdated").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
