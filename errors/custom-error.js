class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); // comes to parent
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
