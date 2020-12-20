const express = require("express");
const logging = require("../logging");
const userRouter = require("./users");
const accountRouter = require("./accounts");
const sportsbookRouter = require("./sportsbooks");
const stateRouter = require("./states");
const sessionRouter = require("./session");
const statusRouter = require("./statuses");
const betTypeRouter = require("./betTypes");
const betCategoryRouter = require("./betCategories");
const sportRouter = require("./sports");
const betTargetRouter = require("./betTargets");
const leagueRouter = require("./leagues");
const webhookRouter = require("./webhooks");

const router = express.Router();
if (process.env.NODE_ENV !== "test")
  router.use("/v1", logging.pinoExpressLogger);
router.use("/v1/users", userRouter);
router.use("/v1/sportsbooks", sportsbookRouter);
router.use("/v1/states", stateRouter);
router.use("/v1/webhooks", webhookRouter);
router.use("/v1/accounts", accountRouter);
router.use("/v1/statuses", statusRouter);
router.use("/v1/betTypes", betTypeRouter);
router.use("/v1/betCategories", betCategoryRouter);
router.use("/v1/sports", sportRouter);
router.use("/v1/leagues", leagueRouter);
router.use("/v1/betTargets", betTargetRouter);
router.use("/v1", sessionRouter);

module.exports = router;
