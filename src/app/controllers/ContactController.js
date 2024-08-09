const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: "Contact not found!" });
    }

    return response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;
    if (!name || !email)
      return response.status(404).json({ error: "Name, Email is required" });
    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response
        .status(400)
        .json({ error: "this e-mail is already been taken!" });
    }
    const contact = await ContactsRepository.store({
      name,
      email,
      phone_number: phone,
      category_id,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: "Contact not found!" });
    }

    if (!name || !email) {
      return response.status(404).json({ error: "Name, Email is required" });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists && contactExists.id !== id) {
      return response
        .status(400)
        .json({ error: "this e-mail is already been taken!" });
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    return response.json(updatedContact);
  }

  async delete() {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: "Contact not found!" });
    }
    await ContactsRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
