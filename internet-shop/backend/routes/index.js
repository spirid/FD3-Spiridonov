const express = require("express");
const router = express.Router();

// Main API route
router.get("/", (req, res) => {
  res.json({ message: "Internet Shop API" });
});

module.exports = router;
