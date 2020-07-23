const admin = require("firebase-admin");
const config = require("./config");

const serviceAccount = {
  project_id: config.get("firebase.project_id"),
  private_key_id: config.get("firebase.private_key_id"),
  private_key: config.get("firebase.private_key"),
  type: "service_account",
  client_email: config.get("firebase.client_email"),
  client_id: config.get("firebase.client_id"),
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: config.get("firebase.client_cert_url"),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${config.get("firebase.project_id")}.firebaseio.com`,
});

module.exports = admin;
