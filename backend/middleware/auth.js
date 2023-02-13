const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware Functions have access to the requset and response cycle/objects and next is a callback to continue onto the next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // Status 401: not authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    // If token is not valid:
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
