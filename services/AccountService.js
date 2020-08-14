const bcrypt = require("bcrypt");
const AccountModel = require("../models/Account");
const Account = require("../models/Account");

const returning = "*";

/**
 * Get account by id
 *
 * @param {String} accountId Internal account
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getAccountById(accountId, query = {}) {
  const q = AccountModel.query().findById(accountId).returning(returning);
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}
/*Delete account
exports.deleteAccountById = function(accountId) {
  return Account.query().deleteById(accountId);
};*/

/**
 * Delete account by id
 *
 * @param {String} accountId Internal account
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function deleteAccountById(accountId, query = {}) {
  const q = AccountModel.query().deleteById(accountId).returning(returning);
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q
}
/**
 * Get account by email
 *
 * @param {String} email Account email
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getAccountByEmail(email, query = {}) {
  const q = AccountModel.query().findOne("email", email).returning(returning);
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

/**
 * Create account
 *
 * @param {Object} account The account body to be created
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
async function createAccount(account, query = {}) {
  //const salt = await bcrypt.genSalt(10);
 // const hash = await bcrypt.hash(account.hashed_pw, salt);
  //console.log({ ...account, hashed_pw: hash });
  return AccountModel.query()
    .insert({ ...account, /*hashed_pw: hash*/ })
    .returning("*");
}

/**
 * Update account by id
 *
 * @param {String} accountId The id of account
 * @param {Object} account The object containing query filters
 * @return {Object}
 * */
async function updateAccountById(accountId, account) {
  if (account.hashed_pw) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(account.hashed_pw, salt);
    account.hashed_pw = hash;
  }
  const q = AccountModel.query()
    .findById(accountId)
    .patch(account)
    .returning("*");
  return q;
}

/**
 * Get account by id
 *
 * @param {String} accountId Internal account
 * @param {String} password Password to be verified
 * @return {Object}
 * */
async function vefifyAccountPasswordById(accountId, password) {
  const q = AccountModel.query().findById(accountId);
  const account = await q;
  const verified = await bcrypt.compare(password, account.password);
  return verified;
}

/**
 * Get accounts by user id
 *
 * @param {String} userId user id
 * @param {Object} query The object containing query filters
 * @return {Object}
 * */
function getAccountsByUserId(user_id, query = {}) {
  const q = AccountModel.query().where("user_id", user_id).returning(returning);
  if (query) {
    const { eager } = query;
    if (eager) {
      q.eager(Array.isArray(eager) ? `[${eager.join(", ")}]` : eager);
    }
  }
  return q;
}

module.exports = {
  createAccount,
  getAccountById,
  updateAccountById,
  getAccountByEmail,
  vefifyAccountPasswordById,
  getAccountsByUserId,
  deleteAccountById
};
