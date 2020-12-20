const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
  isSelf,
} = require("../middleware");

const { createUser } = require("../controllers/User");
const { getAccountsByUserId } = require("../controllers/Account");
const { getBetsByUserId } = require("../controllers/Bet");
const router = express.Router();

router.post("/", createUser.validator, createUser.controller);
router.get(
  "/:userId/accounts",
  verifyTokenAndCookie,
  getAccountsByUserId.validator,
  getAccountsByUserId.controller
);
router.get(
  "/:userId/bets",
  verifyTokenAndCookie,
  getBetsByUserId.validator,
  getBetsByUserId.controller
);
module.exports = router;
