const express = require("express");

// Reader routes
const readerController = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter.post("/", readerController.createReader);

readerRouter.get("/", readerController.findReaders);

readerRouter.get("/:id", readerController.findReader);

readerRouter.patch("/:id", readerController.updateReader);

readerRouter.delete("/:id", readerController.deleteReader);

// Book Routes
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/books", bookController.createBook);

module.exports = readerRouter;
