const Ticket = require("../modals/tickets");

const checkTicketAssignment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    // console.log("assss", ticket.assignedTo);
    
    if (ticket.assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Ticket already assigned, cannot perform this operation",
      });
    }
    req.ticket = ticket;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTicketById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    req.ticket = ticket;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { checkTicketAssignment, getTicketById };
