const pool = require("../db/connection");

const deleteCar = async (req, res) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [car] = await connection.query("SELECT * FROM cars WHERE id = ?", [
      id,
    ]);
    if (car.length === 0) {
      return res.status(404).json({ error: "car not found" });
    }

    await connection.query("DELETE FROM cars_items WHERE car_id = ?", [id]);

    await connection.query("DELETE FROM cars WHERE id = ?", [id]);

    await connection.commit();

    return res.status(204).send();
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  deleteCar,
};
