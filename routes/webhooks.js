const express = require("express");

const { fetchBets } = require("../controllers/Webhook");
const router = express.Router();

router.post("/fetchData", fetchBets.controller);
module.exports = router;
