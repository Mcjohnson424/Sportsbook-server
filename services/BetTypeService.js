const BetTypeModel = require("../models/Bet_type");

/**
 * Get bet_type by id
 *
 * @param {String} bet_typeId Internal status
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getBetTypeById(bet_typeId, query = {}) {
  const q = BetTypeModel.query().findById(bet_typeId).returning("*");
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create bet_type
 *
 * @param {Object} bet_type The bet_type body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createBetType(bet_type, query = {}) {
  return BetTypeModel.query()
    .insert({ ...bet_type })
    .returning("*");
}

/**
 * Update bet_type by id
 *
 * @param {String} bet_typeId The id of status
 * @param {Object} bet_type The object containing query filters
 * @return {Object}
 * */
async function updateBetTypeById(bet_typeId, bet_type) {
  const q = BetTypeModel.query().findById(bet_typeId).patch(bet_type).returning("*");
  return q;
}

/**
 * Get bet_types
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getBetTypes(query = {}) {
  const q = BetTypeModel.query().returning("*");
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
 * Delete bet_type by id
 *
 * @param {String} bet_typeId The id of status
 * @return {Object}
 * */
async function deleteBetTypeById(bet_typeId) {
  return BetTypeModel.query().deleteById(bet_typeId);
}

module.exports = {
  updateBetTypeById,
  createBetType,
  getBetTypeById,
  getBetTypes,
  deleteBetTypeById,
};
