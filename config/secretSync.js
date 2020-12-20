const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { Storage } = require("@google-cloud/storage");
const { includes, map, filter, flatten } = require("lodash/fp");

/* eslint-disable no-console */

const GCLOUD_PROJECT = "petzy-253215";

const branch = process.env.GAE_SERVICE; // === 'default'
//   ? 'production' // Note: This is invalid as we don't use the default services, and this folder won't exist
//   : process.env.GAE_SERVICE

const forCurrentEnvironment = ({ name }) => {
  return includes(branch)(name);
};

const download = file => {
  console.log(`Downloading file: ${file.name}`);
  return file.download();
};

const loadRemoteEnv = async () => {
  const bucketName = `${GCLOUD_PROJECT}-backend`;
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const [exists] = await bucket.exists();

  if (exists) {
    console.log(
      `Syncing static files for ${GCLOUD_PROJECT} service: ${
        process.env.GAE_SERVICE
      } from ${bucketName}`
    );

    const content = await bucket
      .getFiles()
      .then(flatten)
      .then(filter(forCurrentEnvironment))
      .then(map(download))
      .then(data => {
        if (data.length === 0) {
          throw new Error("failed to download matching .env file");
        }
        return data[0];
      })
      .catch(error => {
        console.error(error);
        process.exit(1);
      });

    const parsed = dotenv.parse(content);

    // Note: Taken from dotenv lib
    Object.keys(parsed).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key];
      } else {
        console.log(
          `"${key}" is already defined in \`process.env\` and will not be overwritten`
        );
      }
    });
    return;
  }
  throw new Error(`${bucketName} doesn't exist, required for secret syncing.`);
};

const appRoot = path.dirname(
  require.main.filename || process.mainModule.filename
);

function loadEnv() {
  dotenv.config();
}

module.exports = {
  hasEnv: fs.existsSync(`${appRoot}/.env`),
  loadRemoteEnv,
  loadEnv
};
