const { v4: uuid } = require("uuid");

let contacts = [
  {
    id: uuid(),
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: "Joana Smith",
    email: "joana_smith@example.com",
    phone: "1234567890",
    category_id: uuid(),
  },
];

class ContactsRepository {
  async findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  async findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
