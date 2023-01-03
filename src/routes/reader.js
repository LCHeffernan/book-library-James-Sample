const express = require('express')

const readerController = require('../controllers/reader')

const readerRouter = express.Router()

readerRouter.post('/', readerController.createReader);

module.exports = readerRouter;