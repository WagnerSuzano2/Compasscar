const pool = require("../db/connection");

const carRegistration = async (req, res) => {
  const { brand, model, year } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();
    let items = req.uniqueItems;

    const [carResult] = await connection.query(
      "INSERT INTO `cars` (`brand`, `model`, `year`) VALUES (?, ?, ?)",
      [brand, model, year]
    );
    const carId = carResult.insertId;

    for (const item of items) {
      await connection.query(
        "INSERT INTO `cars_items` (`name`, `car_id`) VALUES (?, ?)",
        [item, carId]
      );
    }

    await connection.commit();
    return res.status(201).json({ message: `id:${carId}` });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
        console.error("Transaction rolled back due to error:", error);
      } catch (rollbackError) {
        console.error("Error reversing transaction:", rollbackError);
      }
    }
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        connection.release();
      } catch (releaseError) {
        console.error("Internal Server Error:", releaseError);
      }
    }
  }
};
module.exports = {
  carRegistration,
};
