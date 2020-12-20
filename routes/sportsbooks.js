const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getSportsbooks } = require("../controllers/Sportsbook");

const router = express.Router();

router.get("/", getSportsbooks.controller);
module.exports = router;
