const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getBetCategories } = require("../controllers/BetCategory");

const router = express.Router();

router.get("/", getBetCategories.controller);
module.exports = router;
