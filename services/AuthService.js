const jwt = require("jsonwebtoken");
const config = require("../config");

const settings = config.get("token");

exports.getToken = function (user, secret, duration) {
  const checkedSecret = secret ? secret : settings.secret;
  const checkedDuration = duration ? duration : settings.duration;
  return jwt.sign(user, checkedSecret, {
    expiresIn: Number.parseInt(checkedDuration),
  });
};

exports.verifyToken = function (token, secret) {
  const checkedSecret = secret ? secret : settings.secret;
  return jwt.verify(token, checkedSecret);
};
