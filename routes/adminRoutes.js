const express = require("express");
const router = express.Router();

const {
  getAdminDashboardStats,
  getLatestTickets,
} = require("../controllers/adminController");
const { verifyRoles } = require("../middleware/authMiddleware");

router.get("/get-admin-stats", verifyRoles(["admin"]), getAdminDashboardStats);
router.get("/get-latest-tickets", verifyRoles(["admin"]), getLatestTickets);

module.exports = router;
