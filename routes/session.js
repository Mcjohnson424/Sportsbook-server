const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { userSessionEnd, userSessionStart } = require("../controllers/User");

const router = express.Router();

router.post(
  "/sessionStart",
  userSessionStart.validator,
  userSessionStart.controller
);

router.post("/sessionEnd", userSessionEnd.controller);
router.get(
  "/sessionInfo",
  (req, res, next) => {
    if (!req.cookies.session_web_aggregator) {
      // We only want session info returning when it is running on cookies
      return res.boom.unauthorized("No Active Session");
    }
    return next();
  },
  verifyTokenAndCookie, // Load session cookie token and verify
  loadInternalUserAndSync, // Load internal user information, extended so we know brand information
  async (req, res, next) => {
    return res.json(res.locals.user);
  }
);

module.exports = router;
