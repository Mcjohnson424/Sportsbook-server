const StatusModel = require("../models/Status");

/**
 * Get status by id
 *
 * @param {String} statusId Internal status
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getStatusById(statusId, query = {}) {
  const q = StatusModel.query().findById(statusId).returning("*");
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create status
 *
 * @param {Object} status The status body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createStatus(status, query = {}) {
  return StatusModel.query()
    .insert({ ...status })
    .returning("*");
}

/**
 * Update status by id
 *
 * @param {String} statusId The id of status
 * @param {Object} status The object containing query filters
 * @return {Object}
 * */
async function updateStatusById(statusId, status) {
  const q = StatusModel.query().findById(statusId).patch(status).returning("*");
  return q;
}

/**
 * Get statuss
 *
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function getStatuses(query = {}) {
  const q = StatusModel.query().returning("*");
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
 * Delete status by id
 *
 * @param {String} statusId The id of status
 * @return {Object}
 * */
async function deleteStatusById(statusId) {
  return StatusModel.query().deleteById(statusId);
}

module.exports = {
  updateStatusById,
  createStatus,
  getStatusById,
  getStatuses,
  deleteStatusById,
};
