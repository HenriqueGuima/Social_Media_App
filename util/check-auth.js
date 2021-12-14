const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError("Your session expired. Sign in again.");
      }
    }
    throw new AuthenticationError(
      "Authentication token must be 'Bearer[token]."
    );
  }
  throw new AuthenticationError("Authorization token must be provided.");
};
