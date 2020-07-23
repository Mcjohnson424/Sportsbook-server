class NotFoundError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "NotFoundError";
  }
}
module.exports = NotFoundError;
