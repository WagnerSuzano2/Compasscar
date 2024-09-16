const pool = require("../db/connection");

const listCars = async (req, res) => {
  try {
    let { page = 1, limit = 5, brand, model, year } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (limit > 10) limit = 10;
    if (limit < 1) limit = 5;
    const offset = (page - 1) * limit;

    let query = "SELECT id, brand, model, year FROM cars WHERE 1=1";
    const params = [];

    if (brand) {
      query += " AND brand LIKE ?";
      params.push(`%${brand}%`);
    }
    if (model) {
      query += " AND model LIKE ?";
      params.push(`%${model}%`);
    }
    if (year) {
      query += " AND year >= ?";
      params.push(parseInt(year, 10));
    }

    const [countResult] = await pool.execute(
      `SELECT COUNT(*) AS count FROM cars WHERE 1=1`,
      params
    );
    const totalCount = countResult[0].count;

    if (totalCount === 0) {
      return res.status(204).send();
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const [cars] = await pool.execute(query, params);

    return res.status(200).json({
      count: totalCount,
      pages: Math.ceil(totalCount / limit),
      data: cars,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  listCars,
};
