class InvalidParameterError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "InvalidParameterError";
  }
}
module.exports = InvalidParameterError;
