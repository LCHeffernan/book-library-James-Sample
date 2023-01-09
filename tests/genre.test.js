const { expect } = require("chai");
const request = require("supertest");
const { Genre } = require("../src/models");
const app = require("../src/app");

describe("/genres", () => {
  before(async () => Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });
  describe("with no genres on database", () => {
    describe("POST /genres", () => {
      it("creates a new genre in the database", async () => {
        const response = await request(app).post("/genres").send({
          genre: "Science Fiction",
        });

        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.genre).to.equal("Science Fiction");
        expect(newGenreRecord.genre).to.equal("Science Fiction");
      });
      it("throws an error when there is no genre", async () => {
        const response = await request(app).post("/genres").send({});
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "notNull Violation: Please enter a genre"
        );
      });
      it("throws an error when genre is empty", async () => {
        const response = await request(app).post("/genres").send({
          genre: "",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "Validation error: Please enter a genre"
        );
      });
      it("throws an error when there is a duplicate genre", async () => {
        const response1 = await request(app).post("/genres").send({
          genre: "Science Fiction",
        });
        const response2 = await request(app).post("/genres").send({
          genre: "Science Fiction",
        });
        expect(response1.status).to.equal(201);
        expect(response2.status).to.equal(400);
        expect(response1.body.genre).to.equal("Science Fiction");
        expect(response2.body).to.equal("Genre already on the system");
      });
    });
  });
  describe("with genres in the database", () => {
    let genres;
    beforeEach(async () => {
      genres = await Promise.all([
        Genre.create({
          genre: "Fantasy",
        }),
        Genre.create({
          genre: "Science Fiction",
        }),
        Genre.create({
          genre: "Mystery",
        }),
      ]);
    });
    describe("GET /genres", () => {
      it("Gets all the genres", async () => {
        const response = await request(app).get("/genres");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);
      });
    });
    describe("GET /genre/:id", () => {
      it("gets genre by id", async () => {
        const genre = genres[0];
        const response = await request(app).get(`/genres/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal(genre.genre);
      });
      it("returns 404 if genre doesnt exist", async () => {
        const response = await request(app).get("/genres/1234");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested genre not found :(");
      });
    });
    describe("PATCH /genres/:id", () => {
      it("updates genres genre by id", async () => {
        const genre = genres[0];
        const response = await request(app)
          .patch(`/genres/${genre.id}`)
          .send({ genre: "Fiction" });
        const updatedGenreRecord = await Genre.findByPk(genre.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedGenreRecord.genre).to.equal("Fiction");
      });
      it("returns a 404 if genre doesnt exist", async () => {
        const response = await request(app)
          .patch("/genres/1234")
          .send({ genre: "non-fiction" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested genre not found :(");
      });
    });
    describe("DELETE /genres/:id", () => {
      it("Deletes a genre by id", async () => {
        const genre = genres[0];
        const response = await request(app).delete(`/genres/${genre.id}`);
        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedGenre).to.equal(null);
      });
      it("returns a 404 if genre doesnt exist", async () => {
        const response = await request(app).delete("/genres/1234");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested genre not found :(");
      });
    });
  });
});
