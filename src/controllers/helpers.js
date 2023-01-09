const { Book, Reader } = require("../models");

const get404Error = (model) => ({ error: `Requested ${model} not found :(` });

const removePassword = (obj) => {
  if (obj.hasOwnProperty('password')) {
    delete obj.password
  }
  return obj
}

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };
  return models[model];
};

createItem = async (res, model, item) => {
  const Model = getModel(model);
  try {
    const newItem = await Model.create(item);
    const itemWithoutPassword = removePassword(newItem.get())
    res.status(201).json(itemWithoutPassword);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

findItems = async (res, model) => {
  const Model = getModel(model);
  try {
    const items = await Model.findAll();
    const itemsWithoutPassword = items.map((item) => removePassword(item.get()))
    res.status(200).json(itemsWithoutPassword);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

findItem = async (res, model, id) => {
  const Model = getModel(model);
  try {
    const item = await Model.findByPk(id);
    if (!item) {
      return res.status(404).json(get404Error(model));
    }
    const itemWithoutPassword = removePassword(item.get())
    res.status(200).json(itemWithoutPassword);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

updateItem = async (res, model, data, id) => {
  const Model = getModel(model);
  try {
    const item = await Model.findByPk(id);
    const [updatedItem] = await Model.update(data, {
      where: { id },
    });
    if (!updatedItem) {
      res.status(404).json(get404Error(model));
    }
    const itemWithoutPassword = removePassword(item.get())
    res.status(200).json(itemWithoutPassword);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

deleteItem = async (res, model, id) => {
  try {
    const Model = getModel(model);
    const item = await Model.findByPk(id);
    const deletedItem = await Model.destroy({
      where: { id },
    });
    if (!deletedItem) {
      res.status(404).json(get404Error(model));
    }
    res.status(204).json(item);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createItem,
  findItems,
  findItem,
  updateItem,
  deleteItem,
};
