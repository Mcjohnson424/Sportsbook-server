const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getStates } = require("../controllers/State");

const router = express.Router();

router.get("/", getStates.controller);
module.exports = router;
