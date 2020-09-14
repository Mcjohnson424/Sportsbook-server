const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getBetTargets } = require("../controllers/BetTarget");

const router = express.Router();

router.get("/", getBetTargets.controller);
module.exports = router;
