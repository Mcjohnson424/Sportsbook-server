const express = require("express");
const logging = require("../logging");

const router = express.Router();
if (process.env.NODE_ENV !== "test")
  router.use("/v1", logging.pinoExpressLogger);


module.exports = router;
