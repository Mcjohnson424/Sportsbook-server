const firebase = require("../firebase");
const pick = require("lodash/pick");

/**
 * Parse firebase user to internal format
 *
 * @param {Object} user The firebase user format
 * @return {Object}
 * */
function parseUser(user) {
  return {
    email: user.email,
    phone: user.phoneNumber,
    id: user.id,
    fullName: user.displayName || user.name,
  };
}

/**
 * Pick firebase user fields
 *
 * @param {Object} user The firebase user format
 * @return {Object}
 * */
function pickUser(user) {
  return pick(user, [
    "displayName",
    "password",
    "role",
    "email",
    "phoneNumber",
  ]);
}

/**
 * Get user by ID
 *
 * @param {String} userId The ID of the user that will be fetched
 * @return {Object}
 * */
async function getUserById(userId) {
  const user = await firebase.auth().getUser(userId);
  const userParsed = parseUser(user);
  return Promise.resolve(userParsed);
}

module.exports = {
  parseUser,
  getUserById,
  pickUser,
};
