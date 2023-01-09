const express = require("express");
const authorController = require("../controllers/author");
const router = express.Router();

router.route("/").post(authorController.createAuthor).get(authorController.findAuthors);

router
  .route("/:id")
  .get(authorController.findAuthor)
  .patch(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;