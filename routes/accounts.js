const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { createAccount } = require("../controllers/Account");
const { deleteAccountById } = require("../controllers/Account");
const { updateAccountById } = require("../controllers/Account");
const { getAccountById } = require("../controllers/Account");

const router = express.Router();

router.post("/",verifyTokenAndCookie, createAccount.validator, createAccount.controller);
router.put( "/:accountId",verifyTokenAndCookie , updateAccountById.validator, updateAccountById.controller);
router.delete( "/:accountId",verifyTokenAndCookie , deleteAccountById.validator, deleteAccountById.controller);
router.get( "/:accountId",verifyTokenAndCookie , getAccountById.validator, getAccountById.controller);
module.exports = router;
