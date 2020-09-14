const BetCategoryModel = require("../models/Bet_category");

/**
 * Get bet_type by id
 *
 * @param {String} bet_categoryId Internal status
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getBetCategoryById(bet_categoryId, query = {}) {
  const q = BetCategoryModel.query().findById(bet_categoryId).returning("*");
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
 * @param {Object} bet_category The bet_ategory body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createBetCategory(bet_category, query = {}) {
  return BetCategoryModel.query()
    .insert({ ...bet_category })
    .returning("*");
}

/**
 * Update bet_category by id
 *
 * @param {String} bet_categoryId The id of bet_category
 * @param {Object} bet_category The object containing query filters
 * @return {Object}
 * */
async function updateBetCategoryById(bet_categoryId, bet_category) {
  const q = BetCategoryModel.query().findById(bet_categoryId).patch(bet_category).returning("*");
  return q;
}

/**
 * Get bet_categories
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getBetCategories(query = {}) {
  const q = BetCategoryModel.query().returning("*");
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
 * Delete bet_category by id
 *
 * @param {String} bet_categoryId The id of bet_category
 * @return {Object}
 * */
async function deleteBetCategoryById(bet_categoryId) {
  return BetCategoryModel.query().deleteById(bet_categoryId);
}

module.exports = {
  updateBetCategoryById,
  createBetCategory,
  getBetCategoryById,
  getBetCategories,
  deleteBetCategoryById,
};
