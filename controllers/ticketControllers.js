const Ticket = require("../modals/tickets");
const Engineer = require("../modals/engineers");

const createTickets = async (req, res) => {
  const { title, description, department } = req.body;
  try {
    const newTicket = new Ticket({
      title,
      description,
      department,
      createdBy: req.userId,
    });
    const ticket = await newTicket.save();
    res.status(201).json({ message: "Ticket Created", success: true, ticket });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    const tickets = await Ticket.find(query)
      .populate("assignedTo")
      .populate("createdBy");
    res.status(200).json({
      success: true,
      message: "Ticket List Fetch successfully",
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.userId })
      .populate("assignedTo")
      .populate("createdBy");
    res.status(200).json({
      success: true,
      message: "Tickets assigned to engineer",
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getCreatedByTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.userId })
      .populate("assignedTo")
      .populate("createdBy");
    res.status(200).json({
      success: true,
      message: "Tickets assigned to engineer",
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateTicket = async (req, res) => {
  const { title, description, department } = req.body;
  try {
    if (req.role === "user") {
      // console.log("userId", req.userId.toString());
      // console.log("Ticket userId", req.ticket.createdBy.toString());

      if (req.ticket.createdBy.toString() !== req.userId.toString()) {
        res.status(400).json({ success: false, message: "Not created User" });
      }
    }
    const ticket = await Ticket.findByIdAndUpdate(
      req.ticket._id,
      { title, department, description },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Single Ticket Update successfully",
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const assignTicket = async (req, res) => {
  const { engineerId } = req.body;
  try {
    const ticket = req.ticket;
    const engineer = await Engineer.findById(engineerId);

    if (!engineer) {
      return res
        .status(404)
        .json({ success: false, message: "Engineer not found" });
    }

    if (engineer.department !== ticket.department) {
      return res
        .status(400)
        .json({ success: false, message: "Department is Mismatched" });
    }

    ticket.assignedTo = engineerId;
    ticket.status = "Assigned";
    await ticket.save();

    if (!engineer.assignedTickets.includes(ticket._id)) {
      engineer.assignedTickets.push(ticket._id);
      await engineer.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Engineer assigned", ticket });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const statusUpdate = async (req, res) => {
  const { status } = req.body;
  const engineerId = req.userId;
  try {
    const ticket = req.ticket;
    if (!["In Progress", "Completed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    if (ticket.assignedTo.toString() !== engineerId) {
      return res
        .status(403)
        .json({ success: false, message: "Not your ticket" });
    }
    ticket.status = status;
    await ticket.save();
    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = req.ticket;

    await Ticket.findByIdAndDelete(ticket);

    res.status(200).json({
      message: "Ticket delete successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  createTickets,
  assignTicket,
  getAllTickets,
  getAssignedTickets,
  getCreatedByTickets,
  updateTicket,
  statusUpdate,
  deleteTicket,
};
