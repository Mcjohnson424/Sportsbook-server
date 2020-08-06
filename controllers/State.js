const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const StateService = require("../services/StateService");

module.exports.getStates = {
    controller: async function getStates(req, res) {
      try {
        const response = await StateService.getStates();
        res.json(response);
      } catch (e) {
        req.log.error(e);
        res.boom.badImplementation("Failed to get states");
      }
    }
  };
