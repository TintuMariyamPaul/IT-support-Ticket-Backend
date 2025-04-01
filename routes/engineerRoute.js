const router = require("express").Router();
const {
  createEngineerAccount,
  getAllEngineers,
  getSingleEngineer,
  updateEngineer,
  deleteEngineer,
} = require("../controllers/engineerController");
const { adminVerify } = require("../middleware/authMiddleware");

router.post("/create-engineer", adminVerify, createEngineerAccount);
router.get("/get-all-engineers", adminVerify, getAllEngineers);
router.get("/get-engineer/:id", adminVerify, getSingleEngineer);
router.put("/update-engineer/:id", adminVerify, updateEngineer);
router.delete("/delete-engineer/:id", adminVerify, deleteEngineer);

module.exports = router;
