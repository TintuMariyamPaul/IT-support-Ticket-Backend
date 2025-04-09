const router = require("express").Router();
const {
  createEngineerAccount,
  getAllEngineers,
  getSingleEngineer,
  updateEngineer,
  deleteEngineer,
} = require("../controllers/engineerController");
const { verifyRoles } = require("../middleware/authMiddleware");

router.post("/create-engineer", verifyRoles(["admin"]), createEngineerAccount);
router.get("/get-all-engineers", verifyRoles(["admin"]), getAllEngineers);
router.get("/get-engineer/:id", verifyRoles(["admin"]), getSingleEngineer);
router.put("/update-engineer/:id", verifyRoles(["admin"]), updateEngineer);
router.delete("/delete-engineer/:id", verifyRoles(["admin"]), deleteEngineer);

module.exports = router;
