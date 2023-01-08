const {
  createItem,
  findItems,
  findItem,
  updateItem,
  deleteItem,
} = require("./helpers");

createBook = (req, res) => createItem(res, "book", req.body);

findBooks = (_, res) => findItems(res, "book");

findBook = (req, res) => findItem(res, "book", req.params.id);

updateBook = (req, res) => updateItem(res, "book", req.body, req.params.id);

deleteBook = (req, res) => deleteItem(res, "book", req.params.id);

module.exports = {
  createBook,
  findBook,
  findBooks,
  updateBook,
  deleteBook,
};
