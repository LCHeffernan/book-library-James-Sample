const { Book } = require("../models");

exports.createBook = async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
};

exports.findBooks = async (req, res) => {
  const books = await Book.findAll();
  res.status(200).json(books);
};

exports.findBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found :(" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;
  const book = await Book.findByPk(bookId);
  const [updatedRows] = await Book.update(updateData, {
    where: { id: bookId },
  });
  try {
    if (!book) {
      res.status(404).json({ error: "Book not found :(" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findByPk(bookId);
  const deletedRows = await Book.destroy({ where: { id: bookId } });
  try {
    if (!book) {
      res.status(404).json({ error: "Book not found :(" });
    }
    res.status(204).json(book);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
