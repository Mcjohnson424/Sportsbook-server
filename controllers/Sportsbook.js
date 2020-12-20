const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const SportsbookService = require("../services/SportsbookService");
const firebase = require("../firebase");

module.exports.createSportsbook = {
  validator: celebrate({
    body: Joi.object()
      .required()
      .keys({
        id: Joi.string().allow(null),
        name: Joi.string().allow(null),
        state: Joi.string().allow(null),
        state_id: Joi.string().required(),
      }),
  }),
  controller: async function (req, res) {
    const { body } = req;
    try {
      const response = await SportsbookService.createSportsbook(body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to create sportsbook");
    }
  },
};

module.exports.updateSportsbookById = {
  validator: celebrate({
    body: Joi.object()
      .required()
      .keys({
        id: Joi.string(),
        name: Joi.string(),
      }),
    params: Joi.object().required().keys({ sportsbookId: Joi.string().required() }),
  }),
  controller: async function updateSportsbookById(req, res) {
    const { body, params } = req;
    const { sportsbookId } = params;
    try {
      const response = await SportsbookService.updateSportsbookById(sportsbookId, body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to load sportsbook");
    }
  },
};

module.exports.getSportsbooks = {
  controller: async function getSportsbooks(req, res) {
    try {
      const response = await SportsbookService.getSportsbooks();
      res.json(response);
    } catch (e) {
      req.log.error(e);
      res.boom.badImplementation("Failed to get sportsbooks");
    }
  }
};
  

