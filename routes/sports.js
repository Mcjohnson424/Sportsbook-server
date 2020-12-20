const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getSports } = require("../controllers/Sport");

const router = express.Router();

router.get("/", getSports.controller);
module.exports = router;
