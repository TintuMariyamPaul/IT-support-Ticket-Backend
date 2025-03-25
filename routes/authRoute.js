const router = require("express").Router();
const { createAccount, loginUser } = require("../controllers/authController");

router.post("/signup", createAccount);

router.post("/login", loginUser);

module.exports = router;
