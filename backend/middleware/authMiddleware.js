
const jwt = require("jsonwebtoken");

// =====================================================
// AUTHENTICATE TOKEN
// =====================================================

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  // No authorization header
  if (!authHeader) {
    return res.status(401).json({
      message: "Access token required",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  // Check Bearer format
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded user
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};


// =====================================================
// AUTHORIZE ROLE
// =====================================================

const authorizeRole = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};


module.exports = {
  authenticateToken,
  authorizeRole,
};

