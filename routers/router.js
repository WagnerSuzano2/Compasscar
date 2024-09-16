const express = require("express");
const router = express();

const {
  validateCarRegistration,
} = require("../middlewares/validateCarRegistration");
const { carRegistration } = require("../controllers/carRegistration");
const { listCars } = require("../controllers/listCars");
const { searchCarId } = require("../controllers/searchCarId");

router.post("/api/v1/cars", validateCarRegistration, carRegistration);
router.get("/api/v1/cars", listCars);
router.get("/api/v1/cars/:id", searchCarId);

module.exports = router;
