const router = require("express").Router();
const {
  createTickets,
  assignTicket,
  getAllTickets,
  statusUpdate,
  deleteTicket
} = require("../controllers/ticketControllers");
const {
  userVerify,
  adminVerify,
  engineerVerify,
} = require("../middleware/authMiddleware");

router.post("/create-ticket", userVerify, createTickets);
router.get("/get-all-tickets", adminVerify, getAllTickets);
router.patch("/assign-ticket/:id", adminVerify, assignTicket);
router.patch("/status-update-ticket/:id", engineerVerify, statusUpdate);
router.delete("/delete-ticket/:id", adminVerify, deleteTicket);

module.exports = router;
