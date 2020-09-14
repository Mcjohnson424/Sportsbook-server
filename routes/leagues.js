const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getLeagues } = require("../controllers/League");

const router = express.Router();

router.get("/", getLeagues.controller);
module.exports = router;
