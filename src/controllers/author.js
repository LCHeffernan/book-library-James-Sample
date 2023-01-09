const {
    createItem,
    findItems,
    findItem,
    updateItem,
    deleteItem,
  } = require("./helpers");

  createAuthor = (req, res) => createItem(res, "author", req.body);

  findAuthors = (_, res) => findItems(res, "author");
  
  findAuthor = (req, res) => findItem(res, "author", req.params.id);
  
  updateAuthor = (req, res) => updateItem(res, "author", req.body, req.params.id);
  
  deleteAuthor = (req, res) => deleteItem(res, "author", req.params.id);
  
  module.exports = {
    createAuthor,
    findAuthor,
    findAuthors,
    updateAuthor,
    deleteAuthor,
  };