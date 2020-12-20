const pino = require("pino");
const pinoHttp = require("express-pino-logger");

const config = require("./config");

const logger = pino({
  prettyPrint: !config.get("isProd"),
  messageKey: "message"
});

const pinoExpressLogger = pinoHttp({
  logger
});

module.exports = {
  pinoExpressLogger,
  logger
};
