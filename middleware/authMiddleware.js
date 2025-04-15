const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Access denied. No token provided.",
        success: false,
      });
    }
    // getting token form headers and split in to two values , becouse we will get like this  'Berear Token' we want to remove Berear here
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // it return {userId:<userid>}
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const verifyRoles = (allowedRoles = []) => {
  return (req, res, next) => {
    
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({
          message: "Access denied. No token provided.",
          success: false,
        });
      }

      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
          success: false,
        });
      }

      req.userId = decodedToken.userId;
      req.role = decodedToken.role;

      next();
    } catch (error) {
      res.status(403).json({
        message: error.message,
        success: false,
      });
    }
  };
};

module.exports = {
  tokenVerify,
  verifyRoles,
};
