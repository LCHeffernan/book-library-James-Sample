const express = require("express");

const readerController = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter.post("/", readerController.createReader);

readerRouter.get("/", readerController.findReaders);

readerRouter.get("/:id", readerController.findReader);

readerRouter.patch("/:id", readerController.updateReader);

readerRouter.delete("/:id", readerController.deleteReader);

module.exports = readerRouter;
