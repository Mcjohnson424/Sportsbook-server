const SportModel = require("../models/Sport");

/**
 * Get bet_type by id
 *
 * @param {String} sportId Internal sport
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getSportById(sportId, query = {}) {
  const q = SportModel.query().findById(sportId).returning("*");
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create sport
 *
 * @param {Object} sport The sport body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createSport(sport, query = {}) {
  return SportModel.query()
    .insert({ ...sport })
    .returning("*");
}

/**
 * Update sport by id
 *
 * @param {String} sportId The id of sport
 * @param {Object} sport The object containing query filters
 * @return {Object}
 * */
async function updateSportById(sportId, sport) {
  const q = SportModel.query().findById(sportId).patch(sport).returning("*");
  return q;
}

/**
 * Get sports
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getSports(query = {}) {
  const q = SportModel.query().returning("*");
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
 * Delete sport by id
 *
 * @param {String} sportId The id of sport
 * @return {Object}
 * */
async function deleteSportById(sportId) {
  return SportModel.query().deleteById(sportId);
}

module.exports = {
  updateSportById,
  createSport,
  getSportById,
  getSports,
  deleteSportById,
};
