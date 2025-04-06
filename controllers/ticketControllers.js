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
    const tickets = await Ticket.find();
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

const assignTicket = async (req, res) => {
  const ticketId = req.params.id;
  const { engineerId } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
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

    if (!engineer.assignedTickets.includes(ticketId)) {
      engineer.assignedTickets.push(ticketId);
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
  const ticketId = req.params.id;
  const { status } = req.body;
  const engineerId = req.userId;
  try {
    if (!["In Progress", "Completed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    console.log("engineerId", engineerId);
    console.log("ticket assigned id", ticket.assignedTo.toString());

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
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Ticket not found", success: false });
    }
    if (ticket.assignedTo) {
      return res.status(400).json({
        message: "Ticket Already Assigned Cannot delete",
        success: false,
      });
    }

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
  statusUpdate,
  deleteTicket,
};
