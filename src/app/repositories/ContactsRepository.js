const db = require("../../database");

class ContactsRepository {
  async findAll(orderBy = "ASC") {
    const order = orderBy.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const rows = await db.query(
      `SELECT * FROM contacts ORDER BY name ${order}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query("SELECT * FROM contacts WHERE email = $1", [
      email,
    ]);
    return row;
  }

  async delete(id) {
    const deleteOperation = await db.query(
      "DELETE FROM contacts WHERE id = $1",
      [id]
    );
    return deleteOperation;
  }

  async store({ name, email, phone_number, category_id }) {
    const [contact] = await db.query(
      `
      INSERT INTO
      contacts (name, email, phone_number, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, phone_number, category_id]
    );
    return contact;
  }

  async update(id, { name, email, phone_number, category_id }) {
    const [contact] = await db.query(
      `
      UPDATE contacts
      SET name = $1, email = $2, phone_number = $3, category_id = $4
      WHERE id = $5
      RETURNING *
      `,
      [name, email, phone_number, category_id, id]
    );
    return contact;
  }
}

module.exports = new ContactsRepository();
