const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getBets } = require("../controllers/Bet");

const router = express.Router();

router.get("/", getBets.controller);
module.exports = router;
