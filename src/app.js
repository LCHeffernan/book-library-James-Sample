const express = require("express");

const app = express();

app.use(express.json());

const readerRouter = require("./routes/reader");

const bookRouter = require("./routes/book");

app.use("/readers", readerRouter);

app.use("/books", bookRouter);

module.exports = app;
