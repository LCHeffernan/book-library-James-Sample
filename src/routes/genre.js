const express = require("express");
const genreController = require("../controllers/genre");
const router = express.Router();

router.route("/").post(genreController.createGenre).get(genreController.findGenres);

router
  .route("/:id")
  .get(genreController.findGenre)
  .patch(genreController.updateGenre)
  .delete(genreController.deleteGenre);

module.exports = router;