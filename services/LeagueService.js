const LeagueModel = require("../models/League");

/**
 * Get league by id
 *
 * @param {String} leagueId Internal status
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getLeagueById(leagueId, query = {}) {
  const q = LeagueModel.query().findById(leagueId).returning("*");
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create league
 *
 * @param {Object} league The league body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createLeague(league, query = {}) {
  return LeagueModel.query()
    .insert({ ...league })
    .returning("*");
}

/**
 * Update league by id
 *
 * @param {String} leagueId The id of status
 * @param {Object} league The object containing query filters
 * @return {Object}
 * */
async function updateLeagueById(leagueId, league) {
  const q = LeagueModel.query().findById(leagueId).patch(league).returning("*");
  return q;
}

/**
 * Get leagues
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getLeagues(query = {}) {
  const q = LeagueModel.query().returning("*");
  if (query) {
    const { eager, page, limit, order, sort } = query;

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
 * Delete league by id
 *
 * @param {String} leagueId The id of league
 * @return {Object}
 * */
async function deleteLeagueById(leagueId) {
  return LeagueModel.query().deleteById(leagueId);
}

module.exports = {
  updateLeagueById,
  createLeague,
  getLeagueById,
  getLeagues,
  deleteLeagueById,
};
