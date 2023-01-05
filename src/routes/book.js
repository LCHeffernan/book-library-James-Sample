// Book Routes
const express = require("express");

const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/", bookController.createBook);

bookRouter.get("/", bookController.findBooks);

bookRouter.get("/:id", bookController.findBook);

bookRouter.patch("/:id", bookController.updateBook);

bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
