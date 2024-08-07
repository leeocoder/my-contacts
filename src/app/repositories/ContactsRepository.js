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

  async findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async store({ name, email, phone, category_id }) {
    const contact = {
      id: uuid(),
      name,
      email,
      phone,
      category_id,
    };
    contacts.push(contact);
    return contact;
  }

  async update(id, { name, email, phone, category_id }) {
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    if (contactIndex !== -1) {
      contacts[contactIndex] = {
        id,
        name: name || contacts[contactIndex].name,
        email: email || contacts[contactIndex].email,
        phone: phone || contacts[contactIndex].phone,
        category_id: category_id || contacts[contactIndex].category_id,
      };
    }
    return contacts[contactIndex];
  }
}

module.exports = new ContactsRepository();
