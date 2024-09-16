const pool = require("../db/connection");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const validateCarUpdate = async (req, res, next) => {
  const { brand, model, year } = req.body;
  const { id } = req.params;

  try {
    const parsedYear = parseInt(year, 10);
    const parsedId = parseInt(id, 10);

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const [car] = await pool.execute("SELECT * FROM cars WHERE id = ?", [id]);
    if (car.length === 0) {
      return res.status(404).json({ error: "car not found" });
    }

    if (
      year &&
      (isNaN(year) || year < currentYear - 10 || year > currentYear)
    ) {
      return res.status(400).json({
        error: `year should be between ${currentYear - 10} and ${currentYear}`,
      });
    }

    if (brand && model && year) {
      const [duplicateCarResult] = await pool.execute(
        "SELECT * FROM cars WHERE brand = ? AND model = ? AND year = ? AND id != ?",
        [brand, model, parsedYear, parsedId]
      );

      if (duplicateCarResult.length > 0) {
        return res
          .status(409)
          .json({ message: "there is already a car with this data" });
      }
    }

    next();
  } catch (error) {
    console.error("Erro na validação:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  validateCarUpdate,
};
