const { Model } = require("sequelize");
const models = require("../models");
const { Book, Reader } = require("../models");

const get404Error = (model) => ({ error: `Requested ${model} not found :(` });

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
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

findItems = async (res, model) => {
  const Model = getModel(model);
  try {
    const items = await Model.findAll();
    res.status(200).json(items);
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
    res.status(200).json(item);
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
    res.status(200).json(item);
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
