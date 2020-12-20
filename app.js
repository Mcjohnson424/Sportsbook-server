// Activate Google Cloud Trace and Debug when in production
// Automatically configured when running in GAE
if (process.env.NODE_ENV === "production") {
    require("@google-cloud/trace-agent").start();
    require("@google-cloud/debug-agent").start();
}


const secretSync = require("./config/secretSync");

(async () => {
  console.log("Loading local .env");
  secretSync.loadEnv();

  const logging = require("./logging");
  const config = require("./config");
  const getServer = require("./getServer");

  const server = await getServer();
  const startedServer = server.listen(config.get("port"), () => {
    const { port } = startedServer.address();
    logging.logger.info(`Web Bet Aggregator Service listening on port ${port}`);
  });
})();
