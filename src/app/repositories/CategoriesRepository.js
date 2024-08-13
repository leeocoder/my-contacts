const db = require("../../database");

class CategoriesRepository {
  async findAll(orderBy = "ASC") {
    const order = orderBy.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const rows = await db.query(
      `SELECT * FROM categories ORDER BY name ${order}`
    );
    return rows;
  }

  async store({ name }) {
    const [contact] = await db.query(
      `
      INSERT INTO
      categories (name)
      VALUES ($1)
      RETURNING *
      `,
      [name]
    );
    return contact;
  }
}

module.exports = new CategoriesRepository();
