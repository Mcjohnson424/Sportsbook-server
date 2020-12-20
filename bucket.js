const { Storage } = require("@google-cloud/storage");
const config = require("./config");

const CLOUD_BUCKET = config.get("cloud_bucket");

const storage = new Storage();
const bucket = storage.bucket(CLOUD_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
function getPublicUrl(filename) {
  return `https://cdn.fancify.io/${filename}`;
}
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.files is processed and each file will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
function sendUploadToGCS(req, res, next) {
  if ((!req.files || req.files.length < 1) && !req.file) {
    return next();
  }
  const files = [];
  if (req.files) files.push(...req.files);
  if (req.file) files.push(req.file);

  const promises = files.map(
    (f) =>
      new Promise((resolve, reject) => {
        const gcsname = Date.now() + f.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
          metadata: {
            contentType: f.mimetype,
          },
          resumable: false,
        });

        stream.on("error", (err) => {
          f.cloudStorageError = err;
          reject(err);
        });

        stream.on("finish", () => {
          f.cloudStorageObject = gcsname;

          f.cloudStoragePublicUrl = getPublicUrl(gcsname);
          resolve();
        });

        stream.end(f.buffer);
      })
  );
  Promise.all(promises).then(() => next());
}
// [END process]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const Multer = require("multer");

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});
// [END multer]

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  bucket,
};
