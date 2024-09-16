const express = require("express");
const router = express();

const {
  validateCarRegistration,
} = require("../middlewares/validateCarRegistration");
const { carRegistration } = require("../controllers/carRegistration");
const { listCars } = require("../controllers/listCars");
const { searchCarId } = require("../controllers/searchCarId");
const { validateCarUpdate } = require("../middlewares/validateCarUpdate");
const { updateCar } = require("../controllers/updateCar");

router.post("/api/v1/cars", validateCarRegistration, carRegistration);
router.get("/api/v1/cars", listCars);
router.get("/api/v1/cars/:id", searchCarId);
router.patch("/api/v1/cars/:id", validateCarUpdate, updateCar);

module.exports = router;
