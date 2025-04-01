const router = require("express").Router();
const { getAllUsers, createAccount,getSingleUser,updateUser,deleteUser } = require("../controllers/userController");
const { adminVerify } = require("../middleware/authMiddleware");

router.post("/create-user", adminVerify, createAccount);
router.get("/get-all-users", adminVerify, getAllUsers);
router.get("/get-user/:id", adminVerify, getSingleUser);
router.put("/update-user/:id", adminVerify, updateUser);
router.delete("/delete-user/:id", adminVerify, deleteUser);

module.exports = router;
