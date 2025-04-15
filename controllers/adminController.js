const User = require("../modals/users");
const Engineer = require("../modals/engineers");
const Ticket = require("../modals/tickets");

const getAdminDashboardStats = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    const users = await User.find();
    const engineers = await Engineer.find();

    const stats = {
      totalTickets: tickets.length,
      totalUsers: users.length,
      totalEngineers: engineers.length,
      resolvedTickets: 0,
    };

    tickets.forEach((ticket) => {
      if (ticket.status === "Completed") stats.resolvedTickets++;
    });

    res.status(200).json({
      success: true,
      message: "Admin dashboard stats fetch completed",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getLatestTickets = async (req, res) => {
  try {
    const latestFiveTickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy")
      .populate("assignedTo");

    res.status(200).json({
      success: true,
      message: "Latest 5 Tickets",
      tickets: latestFiveTickets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { getAdminDashboardStats, getLatestTickets };
