const convict = require("convict");

// Define config schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
    required: true,
  },
  isProd: {
    doc: "Boolean for is we are in production",
    format: Boolean,
    default: true,
    required: true,
  },
  log_level: {
    doc: "The Log Level",
    format: ["DEBUG", "INFO", "ERROR"],
    default: "INFO",
    env: "LOG_LEVEL",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    user: {
      doc: "Cloud SQL user",
      format: "*",
      env: "DB_USER",
      required: true,
      default: "?",
    },
    pass: {
      doc: "Cloud SQL password",
      format: "*",
      env: "DB_PASS",
      required: true,
      sensitive: true,
      default: "?",
    },
    name: {
      doc: "Cloud SQL database name",
      format: "*",
      env: "DB_NAME",
      required: true,
      default: "?",
    },
    host: {
      doc: "SQL host",
      format: "*",
      env: "DB_HOST",
      required: true,
      default: "?",
    },
  },

  firebase: {
    project_id: {
      doc: "Firebase Project ID",
      format: "*",
      env: "FIREBASE_PROJECT_ID",
      required: true,
      default: "?",
    },
    private_key_id: {
      doc: "Firebase Private Key ID",
      format: "*",
      env: "FIREBASE_PRIVATE_KEY_ID",
      required: true,
      sensitive: true,
      default: "?",
    },
    private_key: {
      doc: "Firebase Private Key",
      format: "*",
      env: "FIREBASE_PRIVATE_KEY",
      required: true,
      sensitive: true,
      default: "?",
    },
    client_email: {
      doc: "Firebase CLIENT EMAIL",
      format: "*",
      env: "FIREBASE_CLIENT_EMAIL",
      required: true,
      sensitive: true,
      default: "?",
    },
    client_id: {
      doc: "Firebase CLIENT ID",
      format: "*",
      env: "FIREBASE_CLIENT_ID",
      required: true,
      sensitive: true,
      default: "?",
    },
    client_cert_url: {
      doc: "Firebase CLIENT CERT URL",
      format: "*",
      env: "FIREBASE_CLIENT_CERT_URL",
      required: true,
      sensitive: true,
      default: "?",
    },
  },

  cloud_bucket: {
    doc: "Cloud Bucket Name",
    format: "*",
    env: "BUCKET_NAME",
    required: true,
    sensitive: true,
    default: "?",
  },
  domain_url: {
    doc: "Domain Url",
    format: "*",
    env: "DOMAIN_URL",
    required: true,
    sensitive: true,
    default: "?",
  },
  stripe: {
    public_key: {
      doc: "Stripe public key",
      format: "*",
      env: "STRIPE_PUBLIC_KEY",
      required: true,
      sensitive: true,
      default: "?",
    },
    private_key: {
      doc: "Stripe public key",
      format: "*",
      env: "STRIPE_PRIVATE_KEY",
      required: true,
      sensitive: true,
      default: "?",
    },
  },
});

config.load({
  isProd: config.get("env") === "production",
});

// Perform validation
config.validate();

module.exports = config;
