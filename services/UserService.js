const UserModel = require("../models/User");

/**
 * Get user by id
 *
 * @param {String} userId Internal user
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getUserById(userId, query = {}) {
  const q = UserModel.query().findById(userId);
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create user
 *
 * @param {Object} user The user body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function createUser(user, query = {}) {
  return UserModel.query().insert(user).returning("*");
}

/**
 * Update user by id
 *
 * @param {String} userId The id of user
 * @param {Object} user The object containing query filters
 * @return {Object}
 * */
function updateUserById(userId, user) {
  const q = UserModel.query().findById(userId).patch(user).returning("*");
  return q;
}

module.exports = { createUser, getUserById, updateUserById };
