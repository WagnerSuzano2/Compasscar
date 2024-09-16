const pool = require("../db/connection");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const validateCarRegistration = async (req, res, next) => {
  const { brand, model, year, items } = req.body;

  try {
    if (!brand) {
      return res.status(400).json("brand is required");
    }
    if (!model) {
      return res.status(400).json("model is required");
    }
    if (!year) {
      return res.status(400).json("year is required");
    }
    if (!items.length) {
      return res.status(400).json("items is required");
    }

    if (isNaN(year) || year < currentYear - 10 || year > currentYear) {
      return res
        .status(400)
        .json(`year should be between ${currentYear - 10} and ${currentYear}`);
    }

    const [rows] = await pool.query(
      "SELECT 1 FROM `cars` WHERE `brand` = ? AND `model` = ? AND `year` = ? LIMIT 1",
      [brand, model, year]
    );

    if (rows.length > 0) {
      return res
        .status(409)
        .json({ mensagem: "there is already a car with this data" });
    }

    const itemsFound = [];
    for (const item of items) {
      if (!itemsFound.includes(item)) {
        itemsFound.push(item);
      }
    }
    const uniqueItems = itemsFound;

    req.uniqueItems = uniqueItems;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  validateCarRegistration,
};
