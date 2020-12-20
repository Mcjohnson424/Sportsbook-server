const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const cors = require("cors");
const helmet = require("helmet");
const boom = require("express-boom");
const bodyParser = require("body-parser");
const express = require("express");
const firebase = require("./firebase");

module.exports = async () => {
  const routes = require("./routes");
  const config = require("./config");
  const db = require("./db");

  const server = express();
  // GAE Standard - Basic Scaling Requirement
  // This is the initial request to a new instance
  server.get("/_ah/start", (req, res, next) => {
    res.status(200).send();
  });

  server.use(cookieParser());
  // API POST requests
  server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  server.use(bodyParser.json({ extended: true, limit: "50mb" }));
  server.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", config.get("domain_url")],
    })
  );

  // App Engine forwards HTTPS
  server.set("trust proxy", true);

  // Attach error response library to res.boom
  server.use(boom());

  // Harden application
  server.use(helmet());

  // Routes
  server.use(routes);

  // Handle errors
  // Celebrate (Joi) Error Handling
  server.use(errors());


  const root = require("path").join(__dirname, "client", "build");
  server.use(express.static(root));
  server.get("/*", async (req, res) => {
    res.sendFile("index.html", { root });
  });

  await db.migrate.latest();

  return server;
};
