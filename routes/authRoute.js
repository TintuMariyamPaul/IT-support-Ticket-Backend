const express = require("express");
const router = express.Router();
const { loginUser, resetPassword,updateProfile } = require("../controllers/authController");
const { verifyRoles } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/update-profile",  verifyRoles(["user","engineer"]),updateProfile);
router.post("/reset-password",  verifyRoles(["user","engineer"]),resetPassword);

module.exports = router;
