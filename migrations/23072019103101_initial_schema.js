const axios = require("axios");
const fs = require("fs");
const path = require("path");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");
const parse = require("csv-parse");

exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", (table) => {
      table.string("id").primary();
      table.string("email");
      table.string("pw");
      table.string("first_name");
      table.string("last_name");
      table.timestamp("created_at");
      table.timestamp("last_login");
    })
    .createTable("states", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("state_name");
      table.string("state_abbrev");
    })
    .createTable("sportsbooks", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("name");
      table.string("state");
      table.string("data_endpoint");
      table.string("login_url");
      table
        .uuid("state_id")
        .unsigned()
        .references("id")
        .inTable("states")
        .onDelete("CASCADE")
        .index();
    })
    .createTable("accounts", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("state");
      table.string("username");
      table.string("hashed_pw");
      table.timestamp("created_at");
      table.timestamp("last_check");
      table
        .string("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("sportsbook_id")
        .unsigned()
        .references("id")
        .inTable("sportsbooks")
        .onDelete("CASCADE")
        .index();
    })
    .createTable("bet_types", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("bet_type_name");
      table.string("external_id");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("bet_categories", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("bet_category_name");
      table.string("external_id");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("status", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("status_name");
      table.string("external_id");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("results", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("result_name");
      table.string("external_id");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("sports", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("sport_name");
      table.string("external_id");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("leagues", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("league_name");
      table.string("external_id");
      table.string("external_sport_id");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("bet_targets", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("target_name");
      table.string("external_id");
      table.string("league_name");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
      table
        .uuid("league_id")
        .unsigned()
        .references("id")
        .inTable("leagues")
        .onDelete("CASCADE")
        .index();
    })
    .createTable("events", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("event_name");
      table.string("home_team");
      table.string("away_team");
      table.dateTime("event_date_time");
      table.string("external_id");
      table.string("external_league_id");
      table.string("league_name");
      table.string("external_sport_id");
      table.string("sports_name");
      table.string("fanduel_id");
      table.string("draftkings_id");
      table.string("pointbet_id");
      table.string("williamhill_id");
    })
    .createTable("bets", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("external_bet_id");
      table.timestamp("date_time");
      table.string("status");
      table.string("sportsbook_name");
      table.string("sport_name");
      table.string("league_name");
      table.string("target_name");
      table.string("event_name");
      table.float("bet_amount");
      table.string("bet_type_name");
      table.string("bet_category_name");
      table.float("odds_american");
      table.float("odds_decimal");
      table.float("handicap");
      table.float("potential_payout");
      table.string("result");
      table.float("payout");
      table.timestamp("event_date_time");
      table.timestamp("date_retrieved");
      table.timestamp("last_update");
      table
        .uuid("status_id")
        .unsigned()
        .references("id")
        .inTable("status")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("sportsbook_id")
        .unsigned()
        .references("id")
        .inTable("sportsbooks")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("sportsbook_state_id")
        .unsigned()
        .references("id")
        .inTable("states")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("sport_id")
        .unsigned()
        .references("id")
        .inTable("sports")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("league_id")
        .unsigned()
        .references("id")
        .inTable("leagues")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("target_id")
        .unsigned()
        .references("id")
        .inTable("bet_targets")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("event_id")
        .unsigned()
        .references("id")
        .inTable("events")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("bet_type_id")
        .unsigned()
        .references("id")
        .inTable("bet_types")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("bet_category_id")
        .unsigned()
        .references("id")
        .inTable("bet_categories")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("result_id")
        .unsigned()
        .references("id")
        .inTable("results")
        .onDelete("CASCADE")
        .index();
      table
        .string("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .index();
      table
        .uuid("account_id")
        .unsigned()
        .references("id")
        .inTable("accounts")
        .onDelete("CASCADE")
        .index();
    })
    .then(async () => {
      try {
        const {
          data: { sports },
        } = await axios.get(
          "https://api-usa-uat.pointsbet.com/api/v2/sports/list/02May2018"
        );
        await knex("sports").insert(
          sports.map((sport) =>
            pickBy(
              {
                sport_name: sport.name,
                external_id: sport.key,
              },
              identity
            )
          )
        );
        console.log("sports inserted");
        const leagues = [];
        for (let sport of sports) {
          const {
            data: { locales },
          } = await axios.get(
            `https://api-usa-uat.pointsbet.com/api/v2/sports/${sport.key}/competitions`
          );
          locales.forEach((locale) => {
            const { competitions } = locale;
            leagues.push(
              ...competitions.map((c) =>
                pickBy(
                  {
                    league_name: c.name,
                    external_id: c.key,
                    external_sport_id: sport.key,
                  },
                  identity
                )
              )
            );
          });
        }
        await knex("leagues").insert(leagues);
        console.log("leagues inserted");
        const events = [];
        for (let league of leagues) {
          const {
            data: { events: leagueEvents },
          } = await axios.get(
            `https://api-usa-uat.pointsbet.com/api/v2/competitions/${league.external_id}/events/featured?includeLive=true`
          );
          events.push(...leagueEvents);
        }

        await knex("events").insert(
          events.map(
            (event) =>
              pickBy({
                external_id: event.key,
                event_name: event.name,
                external_league_id: event.competitionKey,
                external_sport_id: event.sportKey,
                event_date_time: event.startsAt,
                home_team: event.homeTeam,
                away_team: event.awayTeam,
              }),
            identity
          )
        );
        console.log("events inserted");
      } catch (e) {
        console.log(e);
      }
    })
    .then(async () => {
      try {
        const csvPromise = (cPath) =>
          new Promise((resolve, reject) => {
            fs.readFile(cPath, (err, fileData) => {
              if (err) return reject(err);

              parse(fileData, { columns: true }, (parseErr, rows) => {
                if (parseErr) return reject(parseErr);

                resolve(rows);
              });
            });
          });
        const betCategoriesPath = path.join(
          __dirname,
          "../seeds/bet_categories.csv"
        );
        const betTypesPath = path.join(__dirname, "../seeds/bet_types.csv");
        const resultsPath = path.join(__dirname, "../seeds/results.csv");
        const sportsbooksPath = path.join(
          __dirname,
          "../seeds/sportsbooks.csv"
        );
        const statesPath = path.join(__dirname, "../seeds/states.csv");
        const statusPath = path.join(__dirname, "../seeds/status.csv");

        const betCategories = (
          await csvPromise(betCategoriesPath)
        ).map((betCategory) => pickBy(betCategory, identity));
        const betTypes = (await csvPromise(betTypesPath)).map((b) =>
          pickBy(b, identity)
        );
        const results = (await csvPromise(resultsPath)).map((b) =>
          pickBy(b, identity)
        );
        const states = (await csvPromise(statesPath)).map((b) =>
          pickBy(b, identity)
        );
        const status = (await csvPromise(statusPath)).map((b) =>
          pickBy(b, identity)
        );
        await knex("bet_categories").insert(betCategories);
        console.log("bet categories inserted");
        await knex("bet_types").insert(betTypes);
        console.log("bet types inserted");
        await knex("results").insert(results);
        console.log("results inserted");
        const insertedStates = await knex("states")
          .insert(states)
          .returning(["id"]);
        console.log("states inserted");
        const sportsbooks = (await csvPromise(sportsbooksPath)).map((b) => {
          return pickBy(
            { ...b, state_id: insertedStates[b.state_id - 1].id },
            identity
          );
        });
        await knex("sportsbooks").insert(sportsbooks);
        console.log("sportsbooks inserted");

        await knex("status").insert(status);
        console.log("status inserted");
      } catch (e) {
        console.log(e);
      }
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
