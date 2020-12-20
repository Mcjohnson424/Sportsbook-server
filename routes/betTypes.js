const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getBetTypes } = require("../controllers/BetType");

const router = express.Router();

router.get("/", getBetTypes.controller);
module.exports = router;
