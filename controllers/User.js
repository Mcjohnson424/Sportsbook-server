const { celebrate, Joi: BaseJoi } = require("celebrate");
const Joi = BaseJoi.extend(require("joi-phone-number")).extend(
  require("joi-date-extensions")
);
const UserService = require("../services/UserService");
const firebase = require("../firebase");

module.exports.createUser = {
  validator: celebrate({
    body: Joi.object()
      .required()
      .keys({
        id: Joi.string().allow(null),
        first_name: Joi.string().allow(null),
        last_name: Joi.string().allow(null),
        email: Joi.string().required(),
      }),
  }),
  controller: async function userSessionStart(req, res) {
    const { body } = req;
    try {
      const response = await UserService.createUser(body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to create customer");
    }
  },
};

module.exports.updateUserById = {
  validator: celebrate({
    body: Joi.object()
      .required()
      .keys({
        id: Joi.string(),
        fullName: Joi.string(),
        profileImageUrl: Joi.string().allow(null),
        birthDate: Joi.date().format("YYYY-MM-DD").raw().allow(null),
        phone: Joi.string().phoneNumber({ format: "e164" }).allow(null),
        email: Joi.string(),
      }),
    params: Joi.object().required().keys({ userId: Joi.string().required() }),
  }),
  controller: async function updateUserById(req, res) {
    const { body, params } = req;
    const { userId } = params;
    try {
      const response = await UserService.updateUserById(userId, body);
      return res.json(response);
    } catch (error) {
      req.log.error(error);
      res.boom.badImplementation("Failed to create customer");
    }
  },
};

module.exports.userSessionStart = {
  validator: celebrate({
    body: Joi.object().required().keys({
      idToken: Joi.string().required(),
    }),
  }),
  controller: async function userSessionStart(req, res) {
    // Get the ID token passed
    const { idToken } = req.body;
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    try {
      const decodedToken = await firebase.auth().verifyIdToken(idToken);
      // Set cookie policy for session cookie.
      const sessionCookie = await firebase
        .auth()
        .createSessionCookie(idToken, { expiresIn });

      const options = { maxAge: expiresIn, httpOnly: true };

      res.cookie("session_web_aggregator", sessionCookie, options);
      res.send(decodedToken);
    } catch (error) {
      res.log.error(error);
      res.status(401).send("Unauthorized request");
    }
  },
};

module.exports.userSessionEnd = {
  controller(req, res) {
    res.clearCookie("session_aggregator");
    res.status(200).send();
  },
};
