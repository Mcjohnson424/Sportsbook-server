const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const AccountService = require("../services/AccountService");
const firebase = require("../firebase");

module.exports.createAccount = {
  validator: celebrate({
    body: Joi.object()
      .required()
      .keys({
        username: Joi.string().allow(null),
        state: Joi.string().allow(null),
        hashed_pw: Joi.string().required(),
        sportsbook_id: Joi.string().required(),
      }),
  }),
  controller: async function (req, res) {
    const { body } = req;
    const { tokenUser } = res.locals;
    body.user_id = tokenUser.id;
    try {
      const response = await AccountService.createAccount(body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to create account");
    }
  },
};

module.exports.updateAccountById = {
  validator: celebrate({
    body: Joi.object().required().keys({
      username: Joi.string(),
      hashed_pw: Joi.string().required(),
      state: Joi.string(),
      sportsbook_id: Joi.string().required(),
    }),
    params: Joi.object()
      .required()
      .keys({ accountId: Joi.string().required() }),
  }),
  controller: async function updateAccountById(req, res) {
    const { body, params } = req;
    const { accountId } = params;
    try {
      const response = await AccountService.updateAccountById(accountId, body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to load account");
    }
  },
};
module.exports.deleteAccountById = {
  validator: celebrate({
    params: {
      accountId: Joi.string().required(),
    },
  }),
  controller: function deleteAccountById(req, res) {
    const { accountId } = req.params;
    AccountService.deleteAccountById(accountId)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        req.log.error(error);
        res.boom.badImplementation("Failed to delete account");
      });
  },
};
module.exports.getAccountById = {
  validator: celebrate({
    params: {
      accountId: Joi.string().required(),
    },
  }),
  controller: function getAccountById(req, res) {
    const { accountId } = req.params;
    AccountService.getAccountById(accountId)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        req.log.error(error);
        res.boom.badImplementation("Failed to load account");
      });
  },
};
module.exports.getAccountsByUserId = {
  validator: celebrate({
    params: {
      userId: Joi.string().required(),
    },
  }),
  controller: function getAccountsByUserId(req, res) {
    const { userId } = req.params;
    const { query } = req;
    AccountService.getAccountsByUserId(userId, query)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        req.log.error(error);
        res.boom.badImplementation("Failed to get account");
      });
  },
};
