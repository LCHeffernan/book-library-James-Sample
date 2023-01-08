const express = require("express");
const bookController = require("../controllers/book");
const router = express.Router();

router.route("/").post(bookController.createBook).get(bookController.findBooks);

router
  .route("/:id")
  .get(bookController.findBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
