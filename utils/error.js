class ErrorHandler extends Error {
  constructor(status, message) {
    console.log("Error constructor were called");
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = ErrorHandler;
