const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { createUser } = require("../controllers/User");

const router = express.Router();

router.post("/", createUser.validator, createUser.controller);
module.exports = router;
