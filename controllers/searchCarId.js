const pool = require("../db/connection");

const searchCarId = async (req, res) => {
  const { id } = req.params;

  try {
    const [car] = await pool.execute("SELECT * FROM cars WHERE id = ?", [id]);

    if (car.length === 0) {
      return res.status(404).json({ message: "car not found" });
    }
    const [items] = await pool.execute(
      "SELECT name FROM cars_items WHERE car_id = ?",
      [id]
    );

    const carItems = items.map((item) => item.name);
    const carResponse = {
      id: car[0].id,
      brand: car[0].brand,
      model: car[0].model,
      year: car[0].year,
      items: carItems,
    };

    return res.status(200).json(carResponse);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  searchCarId,
};
