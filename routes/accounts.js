const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { createAccount } = require("../controllers/Account");

const router = express.Router();

router.post("/",verifyTokenAndCookie, createAccount.validator, createAccount.controller);
module.exports = router;
