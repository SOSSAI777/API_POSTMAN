class InvalidCredentialsException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsException';
    this.statusCode = 401;
  }
}

module.exports = InvalidCredentialsException;
