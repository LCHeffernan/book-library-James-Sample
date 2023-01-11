const {
    createItem,
    createBulkItems,
    findItems,
    findItem,
    updateItem,
    deleteItem,
  } = require("./helpers");

  createAuthor = (req, res) => createItem(res, "author", req.body);

  createBulkAuthors = (req, res) => createBulkItems(res, "author", req.body); 

  findAuthors = (_, res) => findItems(res, "author");
  
  findAuthor = (req, res) => findItem(res, "author", req.params.id);
  
  updateAuthor = (req, res) => updateItem(res, "author", req.body, req.params.id);
  
  deleteAuthor = (req, res) => deleteItem(res, "author", req.params.id);
  
  module.exports = {
    createAuthor,
    createBulkAuthors,
    findAuthor,
    findAuthors,
    updateAuthor,
    deleteAuthor,
  };