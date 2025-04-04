const bcrypt = require("bcryptjs");
const Engineers = require("../modals/engineers");
const User = require("../modals/users");

//creating ENGINEERS
const createEngineerAccount = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      department,
      designation,
    } = req.body;
    const isUserExist = await User.findOne({ email: req.body.email });
    const isEngineerExist = await Engineers.findOne({ email: req.body.email });
    if (isUserExist || isEngineerExist) {
      return res.status(401).json({
        message: "Email already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEngineer = new Engineers({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
    });
    await newEngineer.save();
    res
      .status(201)
      .json({ message: "Engineer created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Get All engineers
const getAllEngineers = async (req, res) => {
  try {
    const engineers = await Engineers.find({ role: "engineer" });
    res.status(200).json({
      message: "Engineer List Fetch successfully",
      success: true,
      data: engineers,
      count: engineers.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Get Single engineer
const getSingleEngineer = async (req, res) => {
  try {
    const { id } = req.params;
    const engineer = await Engineers.findOne({
      _id: id,
    });

    if (!engineer) {
      return res.status(404).json({
        message: "Engineer not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Single engineer Fetch successfully",
      success: true,
      engineer: engineer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Update Engineer
const updateEngineer = async (req, res) => {
  try {
    const { id } = req.params;
    const engineer = await Engineers.findByIdAndUpdate(
      {
        _id: id,
      },
      { $set: req.body }, // Updates fields with new values
      { new: true, runValidators: true }
    );

    if (!engineer) {
      return res.status(404).json({
        message: "Engineer not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Single engineer Fetch successfully",
      success: true,
      engineer: engineer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Delete Engineer
const deleteEngineer = async (req, res) => {
  try {
    const { id } = req.params;
    const engineer = await Engineers.findByIdAndDelete(id);

    if (!engineer) {
      return res.status(404).json({
        message: "Engineer not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Engineer delete successfully",
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
  createEngineerAccount,
  getAllEngineers,
  getSingleEngineer,
  updateEngineer,
  deleteEngineer,
};
