const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getStatuses } = require("../controllers/Status");

const router = express.Router();

router.get("/", getStatuses.controller);
module.exports = router;
