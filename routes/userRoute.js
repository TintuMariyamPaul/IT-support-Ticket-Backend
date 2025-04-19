const router = require("express").Router();
const {
  getAllUsers,
  createAccount,
  getSingleUser,
  updateUser,
  deleteUser,
  createAdmin,
} = require("../controllers/userController");
const { verifyRoles } = require("../middleware/authMiddleware");

router.post("/create-admin", createAdmin);
router.post("/create-user", verifyRoles(["admin"]), createAccount);
router.get("/get-all-users", verifyRoles(["admin"]), getAllUsers);
router.get("/get-user/:id", verifyRoles(["admin"]), getSingleUser);
router.put("/update-user/:id", verifyRoles(["admin"]), updateUser);
router.delete("/delete-user/:id", verifyRoles(["admin"]), deleteUser);

module.exports = router;
