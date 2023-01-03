const express = require("express");
//require('dotenv').config();
const app = express();
app.use(express.json());
const readerRouter = require('./routes/reader')


app.use('/readers', readerRouter)

module.exports = app;
