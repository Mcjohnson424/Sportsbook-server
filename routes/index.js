const express = require("express");
const logging = require("../logging");
const userRouter  = require('./users')
const accountRouter  = require('./accounts')
const sportsbookRouter  = require('./sportsbooks')
const stateRouter  = require('./states')
const sessionRouter  = require('./session')

const router = express.Router();
if (process.env.NODE_ENV !== "test")
  router.use("/v1", logging.pinoExpressLogger);
router.use("/v1/users", userRouter);
router.use("/v1/sportsbooks", sportsbookRouter);
router.use("/v1/states", stateRouter);
router.use("/v1/accounts", accountRouter);
router.use("/v1", sessionRouter);
router.use("/v1", sessionRouter);

module.exports = router;
