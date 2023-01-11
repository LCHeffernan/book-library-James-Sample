const {
    createItem,
    createBulkItems,
    findItems,
    findItem,
    updateItem,
    deleteItem,
  } = require("./helpers");

  createGenre = (req, res) => createItem(res, "genre", req.body);

  createBulkGenres = (req, res) => createBulkItems(res, "genre", req.body);

  findGenres = (_, res) => findItems(res, "genre");
  
  findGenre = (req, res) => findItem(res, "genre", req.params.id);
  
  updateGenre = (req, res) => updateItem(res, "genre", req.body, req.params.id);
  
  deleteGenre = (req, res) => deleteItem(res, "genre", req.params.id);
  
  module.exports = {
    createGenre, 
    createBulkGenres,
    findGenre,
    findGenres,
    updateGenre,
    deleteGenre,
  };