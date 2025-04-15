const User = require("../modals/users");
const Engineer = require("../modals/engineers");
const bcrypt = require("bcryptjs");

//creating ADMIN and USER
const createAccount = async (req, res) => {
  try {
    // console.log(req.body);
    //1. If the user or Engineer already exists
    const isUserExist = await User.findOne({ email: req.body.email });
    const isEngineerExist = await Engineer.findOne({ email: req.body.email });
    //2. if user or Engineers exists, send an error response
    if (isUserExist || isEngineerExist) {
      return res.status(401).json({
        message: "User already exist",
        success: false,
      });
    }
    // 3. encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // 4. create new UserActivation, save in DB
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({
      message: "User list fetch successfully",
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Get Single engineer
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Single user Fetch successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Update Engineer
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    await User.findByIdAndUpdate(
      {
        _id: id,
      },
      { $set: req.body }, // Updates fields with new values
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "User Update successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Delete Engineer
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User delete successfully",
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
  createAccount,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
