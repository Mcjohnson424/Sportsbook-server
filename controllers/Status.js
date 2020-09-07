const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const StatusService = require("../services/StatusService");

module.exports.getStatuses = {
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
    const { locationId } = params;
    try {
      const response = await StatusService.getStatuses({
        ...query,
      });
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to get statuses");
    }
  },
};
