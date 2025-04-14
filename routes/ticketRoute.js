const router = require("express").Router();
const {
  createTickets,
  assignTicket,
  getAllTickets,
  statusUpdate,
  deleteTicket,
  getAssignedTickets,
  getCreatedByTickets,
  updateTicket,
} = require("../controllers/ticketControllers");
const { verifyRoles } = require("../middleware/authMiddleware");
const {
  checkTicketAssignment,
  getTicketById,
  getAllTicketsMiddlware,
} = require("../middleware/ticketMiddleware");

router.post("/create-ticket", verifyRoles(["user", "admin"]), createTickets);
router.get(
  "/get-all-tickets",
  verifyRoles(["admin"]),
  getAllTicketsMiddlware,
  getAllTickets
);
router.get(
  "/get-assinged-tickets",
  verifyRoles(["engineer"]),
  getAllTicketsMiddlware("assigned"),
  getAssignedTickets
);
router.get(
  "/get-createdby-tickets",
  verifyRoles(["user"]),
  getAllTicketsMiddlware("created"),
  getCreatedByTickets
);
router.put(
  "/update-ticket/:id",
  verifyRoles(["admin", "user"]),
  checkTicketAssignment,
  updateTicket
);
router.patch(
  "/assign-ticket/:id",
  verifyRoles(["admin"]),
  getTicketById,
  assignTicket
);
router.patch(
  "/status-update-ticket/:id",
  verifyRoles(["engineer"]),
  getTicketById,
  statusUpdate
);
router.delete(
  "/delete-ticket/:id",
  verifyRoles(["user", "admin"]),
  checkTicketAssignment,
  deleteTicket
);

module.exports = router;
