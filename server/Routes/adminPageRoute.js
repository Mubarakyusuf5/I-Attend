const express = require("express");
const router = express.Router();
const {
  displayStudent,
  displayStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/userController");
const { GenerateToken, displayTodaysToken, markAttendance, displayTodaysAttendance, displayAttendance } = require("../controllers/tokenController.js")
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.put("/updateStudent/:id", 
  VerifyToken, authorizeRoles("Lecturer"), 
  updateStudent);
router.delete("/deleteStudent/:id", 
  VerifyToken, authorizeRoles("Lecturer"), 
  deleteStudent);
router.get("/displayStudent", 
  VerifyToken, authorizeRoles("Lecturer"), 
  displayStudent);
router.get("/displayStudentById/:id", 
  VerifyToken, authorizeRoles("Lecturer"), 
  displayStudentById);
  
router.post("/generateToken",
   VerifyToken, authorizeRoles("Lecturer"), 
   GenerateToken)
   router.get('/getTodaysToken', 
    VerifyToken, authorizeRoles("Lecturer"), 
    displayTodaysToken
  )
  router.post('/markAttendance', 
    VerifyToken, authorizeRoles("Student"), 
  markAttendance
)
  router.get('/displayAttendance', 
    VerifyToken, authorizeRoles("Lecturer"), 
  displayAttendance
)
  router.get('/todaysAttendance', 
    VerifyToken, authorizeRoles("Lecturer"), 
  displayTodaysAttendance
)


module.exports = router;
