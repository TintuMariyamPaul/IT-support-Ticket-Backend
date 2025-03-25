const mongoose = require("mongoose");

// defining schema for users
const userScema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "engineer", "admin"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // enable time stamp
  }
);

module.exports = mongoose.model("users", userScema);
