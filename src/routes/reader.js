const express = require("express");
const readerController = require("../controllers/reader");
const router = express.Router();

router
  .route("/")
  .post(readerController.createReader)
  .get(readerController.findReaders);

router.route("/bulk").post(readerController.createBulkReaders);

router
  .route("/:id")
  .get(readerController.findReader)
  .patch(readerController.updateReader)
  .delete(readerController.deleteReader);

module.exports = router;
