const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // getting token form headers and split in to two values , becouse we will get like this  'Berear Token' we want to remove Berear here
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // it return {userId:<userid>}
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};
