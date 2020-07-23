const path = require("path");

// Use same app config file (this file can be called outside of the app context for migrations)
const config = require("./config");

// Dynamic migration options
exports[config.get("env")] = {
  client: "pg",
  connection: {
    user: config.get("db.user"),
    password: config.get("db.pass"),
    database: config.get("db.name"),
    host: config.get("db.host"),
    ssl: false
  },
  pool: {
    min: config.isProd ? 2 : 1,
    max: config.isProd ? 10 : 3
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.normalize(path.join(__dirname, "/migrations"))
  }
};