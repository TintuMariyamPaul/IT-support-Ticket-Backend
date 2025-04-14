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

const getAllTicketsMiddlware = (filtertype = null) => {
  return async (req, res, next) => {
    try {
      const query = {};
      if (req.query.status) {
        query.status = req.query.status;
      }
      if(filtertype==="assigned"){
        query.assignedTo = req.userId
      }

      if(filtertype==="created"){
        query.createdBy = req.userId;
      }
      const tickets = await Ticket.find(query)
        .populate("assignedTo")
        .populate("createdBy");
      req.tickets = tickets;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
};

module.exports = { checkTicketAssignment, getTicketById, getAllTicketsMiddlware };
