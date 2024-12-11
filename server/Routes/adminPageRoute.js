const express = require("express");
const router = express.Router();
const {
  displayStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/userController");
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.put("/updateStudent/:id", 
  // VerifyToken, authorizeRoles("admin"), 
  updateStudent);
router.delete("/deleteStudent/:id", 
  // VerifyToken, authorizeRoles("admin"), 
  deleteStudent);
router.get("/displayStudent", 
  // VerifyToken, authorizeRoles("admin"), 
  displayStudent);


module.exports = router;
