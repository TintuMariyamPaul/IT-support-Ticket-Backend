const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/users");

// //creating ADMIN and USER
// const createAccount = async (req, res) => {
//   try {
//     //1. If the user already exists
//     const user = await User.findOne({ email: req.body.email });
//     //2. if user exists, send an error response
//     if (user) {
//       return res.status(401).json({
//         message: "User already exist",
//         success: false,
//       });
//     }
//     // 3. encrypt the password
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     req.body.password = hashedPassword;

//     // 4. create new UserActivation, save in DB
//     const newUser = new User(req.body);
//     await newUser.save();

//     res.status(201).json({
//       message: "User created successfully",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// login all roles
const loginUser = async (req, res) => {
  try {
    // 1. check is User exists
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }    
    console.log(user);

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
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { loginUser };
