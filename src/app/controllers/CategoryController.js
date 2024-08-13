const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await CategoriesRepository.findAll(orderBy);
    response.json(contacts);
  }
  async store(request, response) {
    const { name } = request.body;
    if (!name) return response.status(404).json({ error: "Name is required" });
    const category = await CategoriesRepository.store({
      name,
    });

    return response.status(201).json(category);
  }
}

module.exports = new CategoryController();
