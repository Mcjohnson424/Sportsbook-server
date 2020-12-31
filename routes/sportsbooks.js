const express = require("express");

const {
  verifyTokenAndCookie,
  loadInternalUserAndSync,
} = require("../middleware");

const { getSportsbooks,updateSportsbookById } = require("../controllers/Sportsbook");

const router = express.Router();

router.get("/", getSportsbooks.controller);
router.put("/:sportbookId", updateSportsbookById.controller);
module.exports = router;
