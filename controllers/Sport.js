const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const SportService = require("../services/SportService");

module.exports.getSports = {
  validator: celebrate({
    query: Joi.object().required().keys({
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
      const response = await SportService.getSports({
        ...query,
      });
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to get sports");
    }
  },
};
