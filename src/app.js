const express = require("express");

const app = express();

app.use(express.json());

const readerRouter = require("./routes/reader");

const bookRouter = require("./routes/book");

const genreRouter = require("./routes/genre");

const authorRouter = require("./routes/author")

app.use("/readers", readerRouter);

app.use("/books", bookRouter);

app.use("/genres", genreRouter);

app.use("/authors", authorRouter);

module.exports = app;
