const express = require("express");
const router = express();

const {
  validateCarRegistration,
} = require("../middlewares/validateCarRegistration");
const { carRegistration } = require("../controllers/carRegistration");

router.post("/api/v1/cars", validateCarRegistration, carRegistration);
router.get("/api/v1/cars", );

module.exports = router;
