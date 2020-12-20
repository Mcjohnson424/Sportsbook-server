const BetTargetModel = require("../models/Bet_target");

/**
 * Get bet_target by id
 *
 * @param {String} bet_targetId Internal target
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getBetTargetById(bet_targetId, query = {}) {
  const q = BetTargetModel.query().findById(bet_targetId).returning("*");
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create bet_target
 *
 * @param {Object} bet_target The bet_target body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createBetTarget(bet_target, query = {}) {
  return BetTargetModel.query()
    .insert({ ...bet_target })
    .returning("*");
}

/**
 * Update bet_target by id
 *
 * @param {String} bet_targetId The id of status
 * @param {Object} bet_target The object containing query filters
 * @return {Object}
 * */
async function updateBetTargetById(bet_targetId, bet_target) {
  const q = BetTargetModel.query().findById(bet_targetId).patch(bet_target).returning("*");
  return q;
}

/**
 * Get bet_targets
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getBetTargets(query = {}) {
  const q = BetTargetModel.query().returning("*");
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
 * Delete bet_target by id
 *
 * @param {String} bet_targetId The id of target
 * @return {Object}
 * */
async function deleteBetTargetById(bet_targetId) {
  return BetTargetModel.query().deleteById(bet_targetId);
}

module.exports = {
  updateBetTargetById,
  createBetTarget,
  getBetTargetById,
  getBetTargets,
  deleteBetTargetById,
};
