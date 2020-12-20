const express = require("express");

const { fetchBets,decrypt } = require("../controllers/Webhook");
const router = express.Router();

router.post("/fetchData", fetchBets.controller);
router.post("/decryptPassword", decrypt.controller);
module.exports = router;
