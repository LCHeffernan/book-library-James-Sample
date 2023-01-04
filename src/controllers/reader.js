const { Reader } = require("../models");

exports.createReader = async (req, res) => {
  const newReader = await Reader.create(req.body);
  res.status(201).json(newReader);
};

exports.findReaders = async (req, res) => {
  const readers = await Reader.findAll();
  res.status(200).json(readers);
};

exports.findReader = async (req, res) => {
  try {
    const readerId = req.params.id;
    const reader = await Reader.findByPk(readerId);
    if (!reader) {
      return res.status(404).json({ error: "Reader not found :(" });
    }
    res.status(200).json(reader);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateReader = async (req, res) => {
  const readerId = req.params.id;
  const updateData = req.body;
  const reader = await Reader.findByPk(readerId);
  const [updatedRows] = await Reader.update(updateData, {
    where: { id: readerId },
  });
  try {
    if (!reader) {
      res.status(404).json({ error: "Reader not found :(" });
    }
    res.status(200).json(reader);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteReader = async (req, res) => {
  const readerId = req.params.id;
  const reader = await Reader.findByPk(readerId);
  const deletedRows = await Reader.destroy({ where: { id: readerId } });
  try {
    if (!reader) {
      res.status(404).json({ error: "Reader not found :(" });
    }
    res.status(204).json(reader);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
