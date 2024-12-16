const express = require("express");
const router = express.Router();
const {
    createSale,
    displaySale,
    displaySaleById,
    updateSale,
    deleteSale,
  } = require("../controllers/salesController");
  const { VerifyToken } = require("../middlewares/jwt.js");
  const authorizeRoles = require("../middlewares/RoleMiddleware.js");

  router.post("/createSale",
    //  VerifyToken, authorizeRoles("Lecturer", "Student"),
      createSale);
  router.put("/updateSale/:id", 
    // VerifyToken, authorizeRoles("Lecturer", "Student"), 
    updateSale);
  router.delete("/deleteSale/:id", 
    // VerifyToken, authorizeRoles("Lecturer", "Student"), 
    deleteSale);
  router.get("/displaySale", 
    // VerifyToken, authorizeRoles("Lecturer", "Student"), 
    displaySale);
  router.get("/displaySale/:id", 
    // VerifyToken, authorizeRoles("Lecturer", "Student"), 
    displaySaleById);
  
  
  module.exports = router;