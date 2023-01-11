const {
  createItem,
  createBulkItems,
  findItems,
  findItem,
  updateItem,
  deleteItem,
} = require("./helpers");

createReader = (req, res) => createItem(res, "reader", req.body);

createBulkReaders = (req, res) => createBulkItems(res, "reader", req.body);

findReaders = (_, res) => findItems(res, "reader");

findReader = (req, res) => findItem(res, "reader", req.params.id);

updateReader = (req, res) => updateItem(res, "reader", req.body, req.params.id);

deleteReader = (req, res) => deleteItem(res, "reader", req.params.id);

module.exports = {
  createReader,
  createBulkReaders,
  findReader,
  findReaders,
  updateReader,
  deleteReader,
};
