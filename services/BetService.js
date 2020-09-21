const parseISO = require("date-fns/parseISO");
const BetModel = require("../models/Bet");

/**
 * Get bet by id
 *
 * @param {String} betId Internal bet
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getBetById(betId, query = {}) {
  const q = BetModel.query().findById(betId).returning("*");
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create bet
 *
 * @param {Object} bet The bet body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createBet(bet, query = {}) {
  return BetModel.query()
    .insert({ ...bet })
    .returning("*");
}

/**
 * Update bet by id
 *
 * @param {String} betId The id of bet
 * @param {Object} bet The object containing query filters
 * @return {Object}
 * */
async function updateBetById(betId, bet) {
  const q = BetModel.query().findById(betId).patch(bet).returning("*");
  return q;
}

/**
 * Get bets
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getBets(query = {}) {
  const q = BetModel.query().returning("*");
  if (query) {
    const {
      eager,
      page,
      limit,
      order,
      sort,
      status_id,
      bet_type_id,
      bet_category_id,
      sport_id,
      league_id,
      bet_target_id,
      startDate,
      endDate,
    } = query;
    if (startDate && endDate) {
      q.whereRaw(`date_time > '${startDate}' and date_time < '${endDate}'`);
    }

    if (status_id) {
      q.where("status_id", status_id);
    }
    if (bet_type_id) {
      q.where("bet_type_id", bet_type_id);
    }
    if (bet_category_id) {
      q.where("bet_category_id", bet_category_id);
    }
    if (sport_id) {
      q.where("sport_id", sport_id);
    }
    if (league_id) {
      q.where("league_id", league_id);
    }
    if (bet_target_id) {
      q.where("bet_target_id", bet_target_id);
    }
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
    if (page && limit) {
      q.page(page - 1, limit);
    } else if (limit) {
      q.limit(limit);
    }
    if (order && sort) {
      q.orderBy(sort, order);
    } else if (order) {
      q.orderBy(sort);
    }
  }
  return q;
}

/**
 * Delete bet by id
 *
 * @param {String} betId The id of bet
 * @return {Object}
 * */
async function deleteBetById(betId) {
  return BetModel.query().deleteById(betId);
}

module.exports = {
  updateBetById,
  createBet,
  getBetById,
  getBets,
  deleteBetById,
};
