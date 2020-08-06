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
        email: Joi.string().required(),
        hashed_pw: Joi.string().required(),
        sportsbook_id: Joi.string().required(),
      }),
  }),
  controller: async function (req, res) {
    const { body } = req;
    const {tokenUser}=res.locals;
    body.user_id=tokenUser.id;
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
    body: Joi.object()
      .required()
      .keys({
        id: Joi.string(),
        username: Joi.string(),
        email: Joi.string(),
      }),
    params: Joi.object().required().keys({ accountId: Joi.string().required() }),
  }),
  controller: async function updateAccountById(req, res) {
    const { body, params } = req;
    const { AccountId } = params;
    try {
      const response = await AccountService.updateAccountById(accountId, body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to load account");
    }
  },
};
module.exports.getAccountsByUserId = {
    validator: celebrate({
      params: {
        userId: Joi.string().required()
      }
    }),
    controller: function getAccountsByUserId(req, res) {
      const { userId } = req.params;
      AccountService.getAccountsByUserId(userId)
        .then(response => {
          res.json(response);
        })
        .catch(error => {
          req.log.error(error);
          res.boom.badImplementation("Failed to get account");
        });
    }
  };
  
