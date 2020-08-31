exports.up = function (knex) {
  return knex.schema
    .alterTable("bets", (table) => {
      table.dropColumn("date_retrieved");
    })
    .alterTable("bets", (table) => {
      table.dateTime("date_retrieved").notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {};
