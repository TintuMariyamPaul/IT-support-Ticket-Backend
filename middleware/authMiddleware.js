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

const adminVerify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Access denied. No token provided.",
        success: false,
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
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

const userVerify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Access denied. No token provided.",
        success: false,
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedToken.role !== "user") {
      return res.status(403).json({
        message: "Access denied. User only.",
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

const engineerVerify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Access denied. No token provided.",
        success: false,
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedToken.role !== "engineer") {
      return res.status(403).json({
        message: "Access denied. Engineer only.",
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

module.exports = { tokenVerify, adminVerify, userVerify, engineerVerify };
