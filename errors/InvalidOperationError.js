class InvalidOperationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "InvalidOperationError";
  }
}
module.exports = InvalidOperationError;
