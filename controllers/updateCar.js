const pool = require("../db/connection");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const updateCar = async (req, res) => {
  const { brand, model, year, items } = req.body;
  const { id } = req.params;
  const parsedId = parseInt(id, 10);

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const updateFields = [];
    const updateValues = [];

    if (brand !== undefined) {
      if (brand.trim() === "") {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ error: "Brand cannot be empty" });
      }
      updateFields.push("brand = ?");
      updateValues.push(brand.trim());
    }

    if (model !== undefined) {
      if (model.trim() === "") {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ error: "Model cannot be empty" });
      }
      updateFields.push("model = ?");
      updateValues.push(model.trim());
    }

    if (year !== undefined) {
      const parsedYear = parseInt(year, 10);
      if (
        isNaN(parsedYear) ||
        (parsedYear < currentYear - 10 && parsedYear > currentYear)
      ) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          error: `year should be between ${
            currentYear - 10
          } and ${currentYear}`,
        });
      }
      updateFields.push("year = ?");
      updateValues.push(parsedYear);
    }

    if (updateFields.length > 0) {
      const updateQuery = `UPDATE cars SET ${updateFields.join(
        ", "
      )} WHERE id = ?`;
      updateValues.push(parsedId);
      await connection.query(updateQuery, updateValues);
    }

    if (items && Array.isArray(items)) {
      const uniqueItems = [...new Set(items)];

      await connection.query("DELETE FROM cars_items WHERE car_id = ?", [
        parsedId,
      ]);

      if (uniqueItems.length > 0) {
        const itemsValues = uniqueItems.map((item) => [parsedId, item]);
        await connection.query(
          "INSERT INTO cars_items (car_id, name) VALUES ?",
          [itemsValues]
        );
      }
    }

    await connection.commit();
    return res.status(204).send();
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error("Erro na transação:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  updateCar,
};
