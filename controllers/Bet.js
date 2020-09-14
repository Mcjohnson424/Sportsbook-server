const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const BetService = require("../services/BetService");

module.exports.getBets = {
  validator: celebrate({
    query: Joi.object().required().keys({
      status_id: Joi.string(),
      bet_type_id:Joi.string(),
      bet_category_id:Joi.string(),
      sport_id:Joi.string(),
      bet_target_id:Joi.string(),
      league_id:Joi.string(),
      limit: Joi.number(),
      page: Joi.number(),
      startDate: Joi.string(),
      endDate: Joi.string(),
      eager: Joi.array(),
    }),
  }),
  controller: async function (req, res) {
    const { params, query } = req;
    try {
      const response = await BetService.getBets({
        ...query,
      });
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to get bets");
    }
  },
};

module.exports.getBetsByUserId = {
  validator: celebrate({
    params: {
      userId: Joi.string().required(),
    },
    query: Joi.object().required().keys({
      status_id: Joi.string(),
      bet_type_id: Joi.string(),
      bet_category_id: Joi.string(),
      sport_id: Joi.string(),
      bet_target_id:Joi.string(),
      league_id:Joi.string(),
      limit: Joi.number(),
      page: Joi.number(),
      startDate: Joi.string(),
      endDate: Joi.string(),
      eager: Joi.array(),
    }),
  }),
  controller: async function (req, res) {
    const { params, query } = req;
    const { userId } = params;
    try {
      const response = await BetService.getBets({ user_id: userId, ...query });
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to get bets");
    }
  },
};
