const Model = require("./BaseModel");
const Account = require("./Account");
const State = require("./State");

class Bet extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "bets";
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
        external_bet_id: { type: ["string","null"] },
        date_time: { type: ["string","null"] },
        status: { type: ["string", "null"] },
        sportsbook_name: { type: ["string", "null"] },
        sport_name: { type: ["string", "null"] },
        league_name: { type: ["string", "null"] },
        target_name: { type: ["string", "null"] },
        event_name: { type: ["string", "null"] },
        bet_amount: { type: ["number", "null"] },
        bet_type_name: { type: ["string", "null"] },
        bet_category_name: { type: ["string", "null"] },
        odds_american: { type: ["number", "null"] },
        odds_decimal: { type: ["number", "null"] },
        handicap: { type: ["number", "null"] },
        potential_payout: { type: ["number", "null"] },
        result: { type: ["string", "null"] },
        payout: { type: ["number", "null"] },
        event_date_time: { type: ["string", "null"] },
        date_retrieved: { type: ["string", "null"] },
        last_update: { type: ["string", "null"] },
        status_id: { type: "string" },
        sportsbook_id: { type: "string" },
        sportsbook_state_id: { type: "string" },
        sport_id: { type: "string" },
        league_id: { type: "string" },
        event_id: { type: "string" },
        target_id: { type: "string" },
        bet_type_id: { type: "string" },
        bet_category_id: { type: "string" },
        result_id: { type: "string" },
        user_id: { type: "string" },
        account_id: { type: "string" },

      },
    };
  }
  static get relationMappings() {
    const User = require("./User");
    const Account = require("./Account");
    const Status = require("./Status");
    const State = require("./State");
    const Sport = require("./Sport");
    const League = require("./League");
    const Bet_target = require("./Bet_target");
    const Event = require("./Event");
    const Bet_type = require("./Bet_type");
    const Bet_category = require("./Bet_category");
    const Result = require("./Result");


    const Sportsbook = require("./Sportsbook");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "bets.user_id",
          to: "users.id"
        }
      },
      sportsbook: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sportsbook,
        join: {
          from: "bets.sportsbook_id",
          to: "sportsboorks.id"
        }
      },
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: "bets.account_id",
          to: "accounts.id"
        }
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: "bets.status_id",
          to: "status.id"
        }
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: State,
        join: {
          from: "bets.sportsbook_state_id",
          to: "state.id"
        }
      },
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sport,
        join: {
          from: "bets.sport_id",
          to: "sports.id"
        }
      },
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: League,
        join: {
          from: "bets.league_id",
          to: "leagues.id"
        }
      },
      target: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bet_target,
        join: {
          from: "bets.target_id",
          to: "bet_targets.id"
        }
      },
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: "bets.event_id",
          to: "events.id"
        }
      },
      bet_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bet_type,
        join: {
          from: "bets.bet_type_id",
          to: "bet_types.id"
        }
      },
      bet_category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bet_category,
        join: {
          from: "bets.bet_category_id",
          to: "bet_categories.id"
        }
      },
      result: {
        relation: Model.BelongsToOneRelation,
        modelClass: Result,
        join: {
          from: "bets.result_id",
          to: "results.id"
        }
      }
     
    };
  }
}

module.exports = Bet;
