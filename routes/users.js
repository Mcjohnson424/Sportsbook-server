const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,isSelf,
} = require("../middleware");

const { createUser } = require("../controllers/User");
const { getAccountsByUserId } = require("../controllers/Account");
const router = express.Router();

router.post("/", createUser.validator, createUser.controller);
router.get("/:userId/accounts",verifyTokenAndCookie, getAccountsByUserId.validator, getAccountsByUserId.controller);
module.exports = router;
