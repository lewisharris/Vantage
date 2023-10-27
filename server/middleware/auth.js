import { AuthenticationError } from "apollo-server";
import { jwt } from "jsonwebtoken";

// Authenticate token
const auth = () => {
  // context = {...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ..
    const token = authHeader.split("bearer")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};

// Authorize Admin
const adminAuthorization = user => {
  if (user.access === "USER" || null) {
    throw new ApolloError("Unauthorized", "UNAUTHORIZED_ADMIN");
  }
};

export default { auth, adminAuthorization };
