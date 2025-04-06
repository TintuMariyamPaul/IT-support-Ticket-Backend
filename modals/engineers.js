const mongoose = require("mongoose");

const engineerSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false, minlength: 8 }, // Added password
    role: { type: String, default: "engineer", enum: ["engineer"] }, // Fixed role
    phone: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: [
        "Support engineer",
        "Linux engineer",
        "Windows engineer",
        "VM engineer",
        "Cloud engineer",
        "DevOps engineer",
      ],
    },
    designation: { type: String },
    assignedTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true, // enable time stamp
  }
);

module.exports = mongoose.model("Engineer", engineerSchema);
