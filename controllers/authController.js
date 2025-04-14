const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/users");
const Engineer = require("../modals/engineers");

// login all roles
const loginUser = async (req, res) => {
  try {
    // 1. check is User exists
    let user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      user = await Engineer.findOne({ email: req.body.email }).select(
        "+password"
      );
    }

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }
    // console.log(user);

    //2. check if the password is correct
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    // 3. user exists & password is correct then asign a JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d", // one day
      }
    );
    res.status(200).json({
      message: `${user?.role} Login successfully`,
      success: true,
      token: token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const updatedData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: "User Profile updated successfully",
        success: true,
        user: updatedUser,
      });
    }

    const engineer = await Engineer.findById(userId);
    if (engineer) {
      updatedData.phone = req.body.phone;
      const updatedEngineer = await Engineer.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: "Engineer Profile updated successfully",
        success: true,
        user: updatedEngineer,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//reset password for user and engineer
const resetPassword = async (req, res) => {
  try {
    const userId = req.userId;
    let user = await User.findById(userId).select("+password");
    if (!user) {
      user = await Engineer.findById(userId).select("+password");
    }

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    console.log(user);
    console.log(req.body.oldpassword);

    //2. check if the password is correct
    const isValid = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.newpassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { loginUser, resetPassword, updateProfile };
